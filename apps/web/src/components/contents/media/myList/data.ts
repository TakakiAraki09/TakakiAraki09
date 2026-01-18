import contents from '@repo/mal-access/result.json';
import { MyListState, getMyListState } from "~/utils/mal/MyListState";
import { MediaType } from '../interfaces';

export interface ListStateAPI {
  status: string;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
  priority: number;
  num_times_rewatched: number;
  rewatch_value: number;
  comments: string;
  start_date: string;
  finish_date: string;
}


export interface MyList {
  mediaType: MediaType,
  id: number;
  status: MyListState;
  score: number;
}

export const apiToMyListAnime = (id: number, props: ListStateAPI, mediaType: MediaType): MyList => {
  return {
    mediaType,
    id: id,
    status: getMyListState(props.status),
    score: props.score,
  }
}
export const myListState = contents.map(val => apiToMyListAnime(val.id, val.my_list_status, MediaType.Anime));
export const myListStateGetById = (id: number) => myListState.find(val => val.id === id);
