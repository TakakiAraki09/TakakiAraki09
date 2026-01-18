import constants from './constants.ts';
const api = new URL('https://api.myanimelist.net/v2/users/araki0809/animelist');
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

export const getAnimeList = async (parse: (url: URL) => URL) => {
  const result = await fetch(parse(api), {
    headers: {
      'Authorization': `Bearer ${constants.access_token}`
    }
  });
  return await result.json() as Promise<Root>;
}

