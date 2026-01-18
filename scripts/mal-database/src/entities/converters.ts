import type { Content, ContentState, NewContent, NewContentState } from '../types.ts'
import type { ContentEntity } from './Content.ts'
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
    myanimelistId: content.myanimelist_id,
    contentType: content.content_type,
    title: content.title,
    mainPictureMedium: content.main_picture_medium,
    mainPictureLarge: content.main_picture_large,
    alternativeTitlesEn: content.alternative_titles_en,
    alternativeTitlesJa: content.alternative_titles_ja,
    alternativeTitlesSynonyms: content.alternative_titles_synonyms,
    startDate: content.start_date,
    synopsis: content.synopsis,
    mean: content.mean,
    rank: content.rank,
    popularity: content.popularity,
    numListUsers: content.num_list_users,
    numScoringUsers: content.num_scoring_users,
    nsfw: content.nsfw,
    malCreatedAt: content.mal_created_at,
    malUpdatedAt: content.mal_updated_at,
    mediaType: content.media_type,
    status: content.status,
    genres: content.genres,
    createdAt: content.created_at instanceof Date ? content.created_at : new Date(content.created_at),
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
    myanimelist_id: entity.myanimelistId,
    content_type: entity.contentType,
    title: entity.title,
    main_picture_medium: entity.mainPictureMedium,
    main_picture_large: entity.mainPictureLarge,
    alternative_titles_en: entity.alternativeTitlesEn,
    alternative_titles_ja: entity.alternativeTitlesJa,
    alternative_titles_synonyms: entity.alternativeTitlesSynonyms,
    start_date: entity.startDate,
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
