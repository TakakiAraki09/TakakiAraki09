import { createMyAnimeListAPI } from "./base.ts"

interface Root {
  data: Daum[]
}

interface Daum {
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

interface ListStatus {
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
