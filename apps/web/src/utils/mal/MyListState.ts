import { css } from "~/styled-system/css";

export enum MyListState {
  MY_LIST_STATE_EMPTY = "empty",
  WATCHING = "watching",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  DROPPED = "dropped",
  PLAN_TO_WATCH = "plan_to_watch",
}

export const getMyListState = (value: string) => {
  switch (value) {
    case MyListState.COMPLETED:
      return MyListState.COMPLETED;
    case MyListState.DROPPED:
      return MyListState.DROPPED;
    case MyListState.ON_HOLD:
      return MyListState.ON_HOLD;
    case MyListState.PLAN_TO_WATCH:
    case "":
      return MyListState.PLAN_TO_WATCH;
    case MyListState.WATCHING:
      return MyListState.WATCHING;
    default:
      return MyListState.MY_LIST_STATE_EMPTY;
  }
};

interface MyListStateLabel {
  state: MyListState;
  color: string;
  displayLabel: string;
}
export const getMyListStateLabel = (state: MyListState): MyListStateLabel => {
  switch (state) {
    case MyListState.COMPLETED:
      return {
        state,
        displayLabel: "Completed",
        color: css({
          color: "bg.primary",
          bg: "accent.primary",
        }),
      };
    case MyListState.DROPPED:
      return {
        state,
        displayLabel: "Dropped",
        color: css({
          color: "bg.primary",
          bg: "accent.warn",
        }),
      };
    case MyListState.ON_HOLD:
      return {
        state,
        displayLabel: "On Hold",
        color: css({
          color: "bg.primary",
          bg: "accent.warn",
        }),
      };
    case MyListState.PLAN_TO_WATCH:
      return {
        state,
        displayLabel: "Plan to Watch",
        color: css({
          color: "bg.primary",
          bg: "accent.info",
        }),
      };
    case MyListState.WATCHING:
      return {
        state,
        displayLabel: "Watching",
        color: css({
          color: "bg.primary",
          bg: "accent.success",
        }),
      };
    default:
      return {
        state: MyListState.MY_LIST_STATE_EMPTY,
        displayLabel: "No List State",
        color: css({
          color: "bg.primary",
          bg: "accent.muted",
        }),
      };
  }
};
