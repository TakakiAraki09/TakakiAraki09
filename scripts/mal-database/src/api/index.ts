import { animeDetail } from "./getAnimeDetail.ts";
import { userAnimeList } from "./getAnimeList.ts";

export const myAnimeListAPI = {
  userAnimeList: userAnimeList,
  animeDetail: animeDetail,
} as const;