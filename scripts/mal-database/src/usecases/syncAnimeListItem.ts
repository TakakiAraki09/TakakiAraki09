import { randomUUID } from 'crypto'
import type { UserAnimeListItemEntity, ContentStateEntity, ContentEntity } from '../entities/index.ts'
import { animeDetail } from '../api/getAnimeDetail.ts'
import {
  findContentByMalId,
  createContent,
  upsertContentState,
} from '../repositories/ContentRepository.ts'
import { fromContentEntity, fromContentAnimeEntity, fromContentStateEntity } from '../entities/index.ts'

interface SyncAnimeListItemParams {
  item: UserAnimeListItemEntity
  contentType: 'anime' | 'manga'
  rateLimitMs?: number
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const syncAnimeListItem = async ({
  item,
  contentType,
  // rateLimitMs = 500,
}: SyncAnimeListItemParams): Promise<void> => {
  const malId = item.malId

  console.log(`Processing: ${item.title} (MAL ID: ${malId})`)

  const existingContent = await findContentByMalId(malId, contentType)

  let contentId: string

  if (!existingContent) {
    console.log(`  - Content not found, fetching details...`)

    contentId = randomUUID()

    try {
      const newContentAnimeEntity = await animeDetail({
        animeId: malId,
        id: contentId,
      })
      // await sleep(rateLimitMs)

      const newContentEntity: ContentEntity = {
        id: contentId,
        contentType,
      }

      const content = fromContentEntity(newContentEntity)
      const contentAnime = fromContentAnimeEntity(newContentAnimeEntity)
      await createContent(content, contentAnime)
      console.log(`  - Created content with id: ${contentId}`)
    } catch (error) {
      console.error(`  - Failed to fetch anime detail for MAL ID: ${malId}`)
      console.error(`    Title: ${item.title}`)
      throw error
    }
  } else {
    contentId = existingContent.id
    console.log(`  - Content already exists with id: ${contentId}`)
  }

  const newContentStateEntity: ContentStateEntity = {
    id: contentId,
    listStatusStatus: item.status,
    listStatusScore: item.score,
    listStatusNumEpisodesWatched: item.numEpisodesWatched,
    listStatusIsRewatching: item.isRewatching ? 1 : 0,
    listStatusUpdatedAt: item.updatedAt,
    listStatusStartDate: item.startDate,
    listStatusFinishDate: item.finishDate,
    createdAt: new Date(),
  }

  await upsertContentState(fromContentStateEntity(newContentStateEntity))
  console.log(`  - Upserted content_state`)
}
