import { createMyAnimeListAPI } from "./base.ts"
import type { ContentAnimeEntity } from '../entities/index.ts'

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
  animeId: number
  id: string
  fields?: string[]
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

const convertToContentAnimeEntity = (
  detail: Root,
  id: string
): ContentAnimeEntity => {
  return {
    id,
    myanimelistId: detail.id,
    title: detail.title,
    mainPictureMedium: detail.main_picture?.medium ?? null,
    mainPictureLarge: detail.main_picture?.large ?? null,
    alternativeTitlesEn: detail.alternative_titles?.en ?? null,
    alternativeTitlesJa: detail.alternative_titles?.ja ?? null,
    alternativeTitlesSynonyms: detail.alternative_titles?.synonyms ? JSON.stringify(detail.alternative_titles.synonyms) : null,
    startDate: detail.start_date ?? null,
    synopsis: detail.synopsis ?? null,
    mean: detail.mean ?? null,
    rank: detail.rank ?? null,
    popularity: detail.popularity ?? null,
    numListUsers: detail.num_list_users ?? null,
    numScoringUsers: detail.num_scoring_users ?? null,
    nsfw: detail.nsfw ?? null,
    malCreatedAt: detail.created_at ?? null,
    malUpdatedAt: detail.updated_at ?? null,
    mediaType: detail.media_type ?? null,
    status: detail.status ?? null,
    genres: detail.genres ? JSON.stringify(detail.genres) : null,
    createdAt: new Date(),
  }
}

export const animeDetail = async ({
  animeId,
  id,
  fields = DEFAULT_FIELDS,
}: Parameter): Promise<ContentAnimeEntity> => {
  const detail = await createMyAnimeListAPI<Root>(`/v2/anime/${animeId}`)(url => {
    url.searchParams.set('fields', fields.join(','))
    return url
  })

  return convertToContentAnimeEntity(detail, id)
}

