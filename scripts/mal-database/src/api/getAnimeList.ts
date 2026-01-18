import { createMyAnimeListAPI } from "./base.ts"
import type { ContentStateEntity } from '../entities/index.ts'

interface Root {
  data: Daum[]
}

export interface Daum {
  node: Node
  list_status: ListStatus
}

interface Node {
  id: number
  title: string
  main_picture: MainPicture
}

interface MainPicture {
  medium: string
  large: string
}

export interface ListStatus {
  status: string
  score: number
  num_episodes_watched: number
  is_rewatching: boolean
  updated_at: string
  start_date?: string
  finish_date?: string
}

interface Parameter {
  userName: string;
  fields?: string[];
  limit?: number;
}

export const userAnimeList = ({
  userName,
  fields = ['list_status'],
  limit = 500,
}: Parameter) => createMyAnimeListAPI<Root>(`/v2/users/${userName}/animelist`)(url => {
  url.searchParams.set('fields', fields.join(','));
  url.searchParams.set('limit', limit.toString());
  return url;
})

const mapListStatusToEnum = (status: string): 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty' => {
  const statusMap: Record<string, 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'> = {
    'watching': 'watching',
    'completed': 'completed',
    'on_hold': 'on_hold',
    'dropped': 'dropped',
    'plan_to_watch': 'plan_to_watch',
  }
  return statusMap[status] ?? 'empty'
}

export const convertToContentStateEntity = (
  listStatus: ListStatus,
  id: string
): ContentStateEntity => {
  return {
    id,
    listStatusStatus: mapListStatusToEnum(listStatus.status),
    listStatusScore: listStatus.score,
    listStatusNumEpisodesWatched: listStatus.num_episodes_watched,
    listStatusIsRewatching: listStatus.is_rewatching ? 1 : 0,
    listStatusUpdatedAt: listStatus.updated_at ? new Date(listStatus.updated_at) : null,
    listStatusStartDate: listStatus.start_date ? new Date(listStatus.start_date) : null,
    listStatusFinishDate: listStatus.finish_date ? new Date(listStatus.finish_date) : null,
    createdAt: new Date(),
  }
}
