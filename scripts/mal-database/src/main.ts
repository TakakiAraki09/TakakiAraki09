import { syncUserAnimeList } from './usecases/syncUserAnimeList.ts'

const userName = 'araki0809'

syncUserAnimeList({
  userName,
  contentType: 'anime',
  limit: 500,
  rateLimitMs: 500,
})
  .then(() => {
    console.log('Sync completed successfully!')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
