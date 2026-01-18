import { syncNews } from './usecases/syncNews.ts'
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

syncNews().then(() => {
  console.log('News sync completed successfully!')
}).catch((error) => {
  console.error('Error during news sync:', error)
})