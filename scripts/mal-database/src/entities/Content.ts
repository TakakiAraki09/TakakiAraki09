export interface ContentEntity {
  id: string
  contentType: 'anime' | 'manga' | 'news'
}

export interface ContentAnimeEntity {
  id: string
  myanimelistId: number
  title: string
  mainPictureMedium: string | null
  mainPictureLarge: string | null
  alternativeTitlesEn: string | null
  alternativeTitlesJa: string | null
  alternativeTitlesSynonyms: string | null
  startDate: string | null
  endDate: string | null
  synopsis: string | null
  mean: number | null
  rank: number | null
  popularity: number | null
  numListUsers: number | null
  numScoringUsers: number | null
  nsfw: string | null
  malCreatedAt: string | null
  malUpdatedAt: string | null
  mediaType: string | null
  status: string | null
  genres: string | null
  createdAt: Date
}

export interface ContentNewsEntity {
  id: string
  guid: string
  title: string
  link: string
  ogImageUrl: string | null
  pubDate: string | null
  isoDate: string | null
  content: string | null
  contentSnippet: string | null
  createdAt: Date
}
