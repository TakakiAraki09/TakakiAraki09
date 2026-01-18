import contents from '@repo/mal-access/result.json';
import type { Dayjs } from 'dayjs';
import { day } from '~/libs/day';
import { AnimeSeason, getSeason } from '~/utils/anime/season';
import { MediaType } from '../interfaces';

export interface AnimeContent {
  mediaType: MediaType;
  id: number;
  name: string;
  startedAt: Dayjs;
  endedAt: Dayjs;
  picture: string;
  season: AnimeSeason;
  numEpisode: number;
  genres: AnimeGenre[];
}

export interface AnimeGenre {
  id: number;
  name: string;
}
export const animeContents = contents.map((val): AnimeContent => {
  const start = day(val.start_date);
  return {
    mediaType: MediaType.Anime,
    id: val.id,
    name: val.alternative_titles.ja,
    startedAt: start,
    endedAt: day(val.end_date),
    picture: val.main_picture.large,
    season: getSeason(start.get("months") + 1),
    numEpisode: val.num_episodes,
    genres: val.genres,
  }
}).sort((a, b) => b.startedAt.toDate().getTime() - a.startedAt.toDate().getTime())

