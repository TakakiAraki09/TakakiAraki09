import { randomUUID } from 'crypto'
import type { NewsItemEntity, ContentEntity, ContentNewsEntity } from '../entities/index.ts'
import { fetchAnimeNews } from '../api/news/animeNews.ts'
import {
  findContentNewsByGuid,
  createContentNews,
} from '../repositories/ContentRepository.ts'
import { fromContentEntity, fromContentNewsEntity } from '../entities/index.ts'

export const syncNews = async (): Promise<void> => {
  console.log('Fetching anime news...')

  const newsItems = await fetchAnimeNews()

  console.log(`Found ${newsItems.length} news items`)

  let createdCount = 0
  let skippedCount = 0

  for (const item of newsItems) {
    const existing = await findContentNewsByGuid(item.guid)

    if (existing) {
      console.log(`  - Skipped: ${item.title} (already exists)`)
      skippedCount++
      continue
    }

    const contentId = randomUUID()

    const contentEntity: ContentEntity = {
      id: contentId,
      contentType: 'news',
    }

    const contentNewsEntity: ContentNewsEntity = {
      id: contentId,
      guid: item.guid,
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      isoDate: item.isoDate,
      content: item.content,
      contentSnippet: item.contentSnippet,
      createdAt: new Date(),
    }

    const content = fromContentEntity(contentEntity)
    const contentNews = fromContentNewsEntity(contentNewsEntity)

    await createContentNews(content, contentNews)

    console.log(`  - Created: ${item.title}`)
    createdCount++
  }

  console.log(`\nAll done! Created: ${createdCount}, Skipped: ${skippedCount}`)
}
