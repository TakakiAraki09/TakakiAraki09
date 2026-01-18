import { randomUUID } from 'crypto';
import { userAnimeList } from './api/getAnimeList.ts';
import { animeDetail } from './api/getAnimeDetail.ts';
import {
  findContentByMalId,
  createContent,
  upsertContentState
} from './ContentRepository.ts';
import type { NewContent, NewContentState } from './types.ts';

const userName = 'araki0809'; // Replace with actual username or use '@me' for authenticated user

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mapListStatusToEnum = (status: string) => {
  const statusMap: Record<string, 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'> = {
    'watching': 'watching',
    'completed': 'completed',
    'on_hold': 'on_hold',
    'dropped': 'dropped',
    'plan_to_watch': 'plan_to_watch',
  };
  return statusMap[status] ?? 'empty';
};

userAnimeList({
  userName,
  limit: 500, // Start with a small limit for testing
})
  .then(async (res) => {
    console.log(`Found ${res.data.length} anime in user list`);

    for (const item of res.data) {
      const malId = item.node.id;
      const contentType = 'anime';

      console.log(`Processing: ${item.node.title} (MAL ID: ${malId})`);

      const existingContent = await findContentByMalId(malId, contentType);

      let contentId: string;

      if (!existingContent) {
        console.log(`  - Content not found, fetching details...`);

        const detail = await animeDetail({ animeId: malId });
        await sleep(500); // Rate limiting: wait 500ms between requests

        contentId = randomUUID();

        const newContent: NewContent = {
          id: contentId,
          myanimelist_id: detail.id,
          content_type: contentType,
          title: detail.title,
          main_picture_medium: detail.main_picture?.medium ?? null,
          main_picture_large: detail.main_picture?.large ?? null,
          alternative_titles_en: detail.alternative_titles?.en ?? null,
          alternative_titles_ja: detail.alternative_titles?.ja ?? null,
          alternative_titles_synonyms: detail.alternative_titles?.synonyms ? JSON.stringify(detail.alternative_titles.synonyms) : null,
          start_date: detail.start_date ?? null,
          synopsis: detail.synopsis ?? null,
          mean: detail.mean ?? null,
          rank: detail.rank ?? null,
          popularity: detail.popularity ?? null,
          num_list_users: detail.num_list_users ?? null,
          num_scoring_users: detail.num_scoring_users ?? null,
          nsfw: detail.nsfw ?? null,
          mal_created_at: detail.created_at ?? null,
          mal_updated_at: detail.updated_at ?? null,
          media_type: detail.media_type ?? null,
          status: detail.status ?? null,
          genres: detail.genres ? JSON.stringify(detail.genres) : null,
        };

        await createContent(newContent);
        console.log(`  - Created content with id: ${contentId}`);
      } else {
        contentId = existingContent.id;
        console.log(`  - Content already exists with id: ${contentId}`);
      }

      const newContentState: NewContentState = {
        id: contentId,
        list_status_status: mapListStatusToEnum(item.list_status.status),
        list_status_score: item.list_status.score,
        list_status_num_episodes_watched: item.list_status.num_episodes_watched,
        list_status_is_rewatching: item.list_status.is_rewatching ? 1 : 0,
        list_status_updated_at: item.list_status.updated_at,
        list_status_start_date: item.list_status.start_date ?? null,
        list_status_finish_date: item.list_status.finish_date ?? null,
      };

      await upsertContentState(newContentState);
      console.log(`  - Upserted content_state`);
    }

    console.log('All done!');
  })
  .catch((error) => {
    console.error('Error:', error);
  })
