import { randomUUID } from 'crypto'
import type { ContentEntity, ContentNewsEntity } from '../entities/index.ts'
import { fetchAnimeNews } from '../api/news/animeNews.ts'
import {
  findContentNewsByGuid,
  createContentNews,
  upsertContentNews,
} from '../repositories/ContentRepository.ts'
import { fromContentEntity, fromContentNewsEntity } from '../entities/index.ts'

export const syncNews = async ({
  upsert = false,
} = {}): Promise<void> => {
  console.log('Fetching anime news...')

  const newsItems = await fetchAnimeNews()

  console.log(`Found ${newsItems.length} news items`)

  let createdCount = 0
  let skippedCount = 0
  let updatedCount = 0

  for (const item of newsItems) {
    const existing = await findContentNewsByGuid(item.guid)

    if (!upsert && existing) {
      console.log(`  - Skipped: ${item.title} (already exists)`)
      skippedCount++
      continue
    }

    const contentId = existing?.id || randomUUID()

    const contentEntity: ContentEntity = {
      id: contentId,
      contentType: 'news',
    }

    const contentNewsEntity: ContentNewsEntity = {
      id: contentId,
      guid: item.guid,
      title: item.title,
      link: item.link,
      ogImageUrl: item.ogImageUrl,
      pubDate: item.pubDate,
      isoDate: item.isoDate,
      content: item.content,
      contentSnippet: item.contentSnippet,
      createdAt: new Date(),
    }

    const content = fromContentEntity(contentEntity)
    const contentNews = fromContentNewsEntity(contentNewsEntity)

    if (upsert) {
      await upsertContentNews(content, contentNews)
      if (existing) {
        console.log(`  - Updated: ${item.title}`)
        updatedCount++
      } else {
        console.log(`  - Created: ${item.title}`)
        createdCount++
      }
    } else {
      await createContentNews(content, contentNews)
      console.log(`  - Created: ${item.title}`)
      createdCount++
    }
  }

  console.log(`\nAll done! Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skippedCount}`)
}
