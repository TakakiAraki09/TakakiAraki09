import { userAnimeList } from '../api/getAnimeList.ts'
import { syncAnimeListItem } from './syncAnimeListItem.ts'

interface SyncUserAnimeListParams {
  userName: string
  contentType?: 'anime' | 'manga'
  limit?: number
  rateLimitMs?: number
}

export const syncUserAnimeList = async ({
  userName,
  contentType = 'anime',
  limit = 500,
  rateLimitMs = 500,
}: SyncUserAnimeListParams): Promise<void> => {
  const items = await userAnimeList({
    userName,
    limit,
  })

  console.log(`Found ${items.length} anime in user list`)

  for (const item of items) {
    await syncAnimeListItem({
      item,
      contentType,
      rateLimitMs,
    })
  }

  console.log('All done!')
}
