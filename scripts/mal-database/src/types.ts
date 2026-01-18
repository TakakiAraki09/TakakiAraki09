import type {
  ColumnType,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  content: ContentTable
  content_state: ContentStateTable
}

export interface ContentTable {
  id: string
  myanimelist_id: number
  content_type: 'anime' | 'manga'
  title: string
  main_picture_medium: string | null
  main_picture_large: string | null
  alternative_titles_en: string | null
  alternative_titles_ja: string | null
  alternative_titles_synonyms: string | null
  start_date: string | null
  synopsis: string | null
  mean: number | null
  rank: number | null
  popularity: number | null
  num_list_users: number | null
  num_scoring_users: number | null
  nsfw: string | null
  mal_created_at: string | null
  mal_updated_at: string | null
  media_type: string | null
  status: string | null
  genres: string | null
  created_at: ColumnType<Date, string | undefined, never>
}

export type Content = Selectable<ContentTable>
export type NewContent = Insertable<ContentTable>
export type ContentUpdate = Updateable<ContentTable>

export interface ContentStateTable {
  id: string
  list_status_status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'
  list_status_score: number | null
  list_status_num_episodes_watched: number | null
  list_status_is_rewatching: number | null
  list_status_updated_at: string | null
  list_status_start_date: string | null
  list_status_finish_date: string | null
  created_at: ColumnType<Date, string | undefined, never>
}

export type ContentState = Selectable<ContentStateTable>
export type NewContentState = Insertable<ContentStateTable>
export type ContentStateUpdate = Updateable<ContentStateTable>
