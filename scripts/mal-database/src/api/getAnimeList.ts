import { createMyAnimeListAPI } from "./base.ts";
import type { UserAnimeListItemEntity } from "../entities/index.ts";

interface Root {
  data: Daum[];
}

interface Daum {
  node: Node;
  list_status: ListStatus;
}

interface Node {
  id: number;
  title: string;
  main_picture: MainPicture;
}

interface MainPicture {
  medium: string;
  large: string;
}

interface ListStatus {
  status: string;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
  start_date?: string;
  finish_date?: string;
}

interface Parameter {
  userName: string;
  fields?: string[];
  limit?: number;
}

const mapListStatusToEnum = (
  status: string,
):
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch"
  | "empty" => {
  const statusMap: Record<
    string,
    "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch" | "empty"
  > = {
    watching: "watching",
    completed: "completed",
    on_hold: "on_hold",
    dropped: "dropped",
    plan_to_watch: "plan_to_watch",
  };
  return statusMap[status] ?? "empty";
};

const convertToUserAnimeListItemEntity = (
  item: Daum,
): UserAnimeListItemEntity => {
  return {
    malId: item.node.id,
    title: item.node.title,
    status: mapListStatusToEnum(item.list_status.status),
    score: item.list_status.score,
    numEpisodesWatched: item.list_status.num_episodes_watched,
    isRewatching: item.list_status.is_rewatching,
    updatedAt: item.list_status.updated_at
      ? new Date(item.list_status.updated_at)
      : null,
    startDate: item.list_status.start_date
      ? new Date(item.list_status.start_date)
      : null,
    finishDate: item.list_status.finish_date
      ? new Date(item.list_status.finish_date)
      : null,
  };
};

export const userAnimeList = async ({
  userName,
  fields = ["list_status"],
  limit = 500,
}: Parameter): Promise<UserAnimeListItemEntity[]> => {
  const root = await createMyAnimeListAPI<Root>(
    `/v2/users/${userName}/animelist`,
  )((url) => {
    url.searchParams.set("fields", fields.join(","));
    url.searchParams.set("limit", limit.toString());
    return url;
  });

  return root.data.map(convertToUserAnimeListItemEntity);
};
