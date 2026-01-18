import { createMyAnimeListAPI } from "./base.ts"

interface Root {
  id: number
  title: string
  main_picture: MainPicture
  alternative_titles: AlternativeTitles
  start_date: string
  synopsis: string
  mean: number
  rank: number
  popularity: number
  num_list_users: number
  num_scoring_users: number
  nsfw: string
  created_at: string
  updated_at: string
  media_type: string
  status: string
  genres: Genre[]
}

interface MainPicture {
  medium: string
  large: string
}

interface AlternativeTitles {
  synonyms: string[]
  en: string
  ja: string
}

interface Genre {
  id: number
  name: string
}

interface Parameter {
  animeId: number;
  fields?: string[];
}

const DEFAULT_FIELDS = [
  'id',
  'title',
  'main_picture',
  'alternative_titles',
  'start_date',
  'end_date',
  'synopsis',
  'mean',
  'rank',
  'popularity',
  'num_list_users',
  'num_scoring_users',
  'nsfw',
  'created_at',
  'updated_at',
  'media_type',
  'status',
  'genres',
  'y_list_status',
  'um_episodes',
  'tart_season',
  'roadcast',
  'ource',
  'verage_episode_duration',
  'ating',
  'ictures',
  'ackground',
  'elated_anime',
  'elated_manga',
  'ecommendations',
  'tudios',
  'tatistics',
];

export const animeDetail = ({
  animeId,
  fields = DEFAULT_FIELDS,
}: Parameter) => createMyAnimeListAPI<Root>(`/v2/anime/${animeId}`)(url => {
  url.searchParams.set('fields', fields.join(','));
  return url;
})

