import { userAnimeList } from './api/getAnimeList.ts';
import { syncAnimeListItem } from './usecases/syncAnimeListItem.ts';

const userName = 'araki0809'; // Replace with actual username or use '@me' for authenticated user

userAnimeList({
  userName,
  limit: 500, // Start with a small limit for testing
})
  .then(async (res) => {
    console.log(`Found ${res.data.length} anime in user list`);

    for (const item of res.data) {
      await syncAnimeListItem({
        item,
        contentType: 'anime',
        rateLimitMs: 500,
      })
    }

    console.log('All done!');
  })
  .catch((error) => {
    console.error('Error:', error);
  })
