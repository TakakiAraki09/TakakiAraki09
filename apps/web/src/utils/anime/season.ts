import { ContentAnimeEntity } from "@repo/mal-database";
import { day } from "~/libs/day";

export enum AnimeSeason {
  UNSTATE_SEASON = 0,
  SPRING = 1,
  SUMMER = 2,
  AUTUMN = 3,
  WINTER = 4,
}

export const getSeasonByAnime = (anime: ContentAnimeEntity) => {
  const month = day(anime.startDate).get("months") + 1;
  switch (month) {
    case 1:
    case 2:
    case 3:
      return AnimeSeason.WINTER;
    case 4:
    case 5:
    case 6:
      return AnimeSeason.SPRING;
    case 7:
    case 8:
    case 9:
      return AnimeSeason.SUMMER;
    case 10:
    case 11:
    case 12:
      return AnimeSeason.AUTUMN;
    default:
      return AnimeSeason.UNSTATE_SEASON;
  }
}

