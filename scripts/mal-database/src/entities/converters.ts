import type { Content, ContentAnime, ContentNews, ContentState, NewContent, NewContentAnime, NewContentNews, NewContentState } from '../types.ts'
import type { ContentEntity, ContentAnimeEntity, ContentNewsEntity } from './Content.ts'
import type { ContentStateEntity } from './ContentState.ts'

const toDate = (value: string | null): Date | null => {
  if (value === null) {
    return null
  }
  return new Date(value)
}

const fromDate = (value: Date | null): string | null => {
  if (value === null) {
    return null
  }
  return value.toISOString()
}

export const toContentEntity = (content: Content): ContentEntity => {
  return {
    id: content.id,
    contentType: content.content_type,
  }
}

export const toContentAnimeEntity = (contentAnime: ContentAnime): ContentAnimeEntity => {
  return {
    id: contentAnime.id,
    myanimelistId: contentAnime.myanimelist_id,
    title: contentAnime.title,
    mainPictureMedium: contentAnime.main_picture_medium,
    mainPictureLarge: contentAnime.main_picture_large,
    alternativeTitlesEn: contentAnime.alternative_titles_en,
    alternativeTitlesJa: contentAnime.alternative_titles_ja,
    alternativeTitlesSynonyms: contentAnime.alternative_titles_synonyms,
    startDate: contentAnime.start_date,
    endDate: contentAnime.end_date,
    synopsis: contentAnime.synopsis,
    mean: contentAnime.mean,
    rank: contentAnime.rank,
    popularity: contentAnime.popularity,
    numListUsers: contentAnime.num_list_users,
    numScoringUsers: contentAnime.num_scoring_users,
    nsfw: contentAnime.nsfw,
    malCreatedAt: contentAnime.mal_created_at,
    malUpdatedAt: contentAnime.mal_updated_at,
    mediaType: contentAnime.media_type,
    status: contentAnime.status,
    genres: contentAnime.genres,
    createdAt: contentAnime.created_at instanceof Date ? contentAnime.created_at : new Date(contentAnime.created_at),
  }
}

export const toContentNewsEntity = (contentNews: ContentNews): ContentNewsEntity => {
  return {
    id: contentNews.id,
    guid: contentNews.guid,
    title: contentNews.title,
    link: contentNews.link,
    pubDate: contentNews.pub_date,
    isoDate: contentNews.iso_date,
    content: contentNews.content,
    contentSnippet: contentNews.content_snippet,
    createdAt: contentNews.created_at instanceof Date ? contentNews.created_at : new Date(contentNews.created_at),
  }
}

export const toContentStateEntity = (contentState: ContentState): ContentStateEntity => {
  return {
    id: contentState.id,
    listStatusStatus: contentState.list_status_status,
    listStatusScore: contentState.list_status_score,
    listStatusNumEpisodesWatched: contentState.list_status_num_episodes_watched,
    listStatusIsRewatching: contentState.list_status_is_rewatching,
    listStatusUpdatedAt: toDate(contentState.list_status_updated_at),
    listStatusStartDate: toDate(contentState.list_status_start_date),
    listStatusFinishDate: toDate(contentState.list_status_finish_date),
    createdAt: contentState.created_at instanceof Date ? contentState.created_at : new Date(contentState.created_at),
  }
}

export const fromContentEntity = (entity: ContentEntity): NewContent => {
  return {
    id: entity.id,
    content_type: entity.contentType,
  }
}

export const fromContentAnimeEntity = (entity: ContentAnimeEntity): NewContentAnime => {
  return {
    id: entity.id,
    myanimelist_id: entity.myanimelistId,
    title: entity.title,
    main_picture_medium: entity.mainPictureMedium,
    main_picture_large: entity.mainPictureLarge,
    alternative_titles_en: entity.alternativeTitlesEn,
    alternative_titles_ja: entity.alternativeTitlesJa,
    alternative_titles_synonyms: entity.alternativeTitlesSynonyms,
    start_date: entity.startDate,
    end_date: entity.endDate,
    synopsis: entity.synopsis,
    mean: entity.mean,
    rank: entity.rank,
    popularity: entity.popularity,
    num_list_users: entity.numListUsers,
    num_scoring_users: entity.numScoringUsers,
    nsfw: entity.nsfw,
    mal_created_at: entity.malCreatedAt,
    mal_updated_at: entity.malUpdatedAt,
    media_type: entity.mediaType,
    status: entity.status,
    genres: entity.genres,
    created_at: undefined,
  }
}

export const fromContentNewsEntity = (entity: ContentNewsEntity): NewContentNews => {
  return {
    id: entity.id,
    guid: entity.guid,
    title: entity.title,
    link: entity.link,
    pub_date: entity.pubDate,
    iso_date: entity.isoDate,
    content: entity.content,
    content_snippet: entity.contentSnippet,
    created_at: undefined,
  }
}

export const fromContentStateEntity = (entity: ContentStateEntity): NewContentState => {
  return {
    id: entity.id,
    list_status_status: entity.listStatusStatus,
    list_status_score: entity.listStatusScore,
    list_status_num_episodes_watched: entity.listStatusNumEpisodesWatched,
    list_status_is_rewatching: entity.listStatusIsRewatching,
    list_status_updated_at: fromDate(entity.listStatusUpdatedAt),
    list_status_start_date: fromDate(entity.listStatusStartDate),
    list_status_finish_date: fromDate(entity.listStatusFinishDate),
    created_at: undefined,
  }
}
