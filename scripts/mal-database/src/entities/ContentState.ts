export interface ContentStateEntity {
  id: string;
  listStatusStatus:
    | "watching"
    | "completed"
    | "on_hold"
    | "dropped"
    | "plan_to_watch"
    | "empty";
  listStatusScore: number | null;
  listStatusNumEpisodesWatched: number | null;
  listStatusIsRewatching: number | null;
  listStatusUpdatedAt: Date | null;
  listStatusStartDate: Date | null;
  listStatusFinishDate: Date | null;
  createdAt: Date;
}
