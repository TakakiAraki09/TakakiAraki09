export enum MyListState {
  MY_LIST_STATE_EMPTY = 'empty',
  WATCHING = 'watching',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
  DROPPED = 'dropped',
  PLAN_TO_WATCH = 'plan_to_watch'
}
export const getMyListState = (value: string) => {
  console.log(value);
  switch (value) {
    case MyListState.COMPLETED:
      return MyListState.COMPLETED;
    case MyListState.DROPPED:
      return MyListState.DROPPED;
    case MyListState.ON_HOLD:
      return MyListState.ON_HOLD;
    case MyListState.PLAN_TO_WATCH:
    case '':
      return MyListState.PLAN_TO_WATCH;
    case MyListState.WATCHING:
      return MyListState.WATCHING;
    default:
      return MyListState.MY_LIST_STATE_EMPTY;
  }
}
//      "status": "completed",
//      "score": 7,
//      "num_episodes_watched": 12,
//      "is_rewatching": false,
//      "updated_at": "2025-11-25T09:51:38Z",
//      "priority": 0,
//      "num_times_rewatched": 0,
//      "rewatch_value": 0,
//      "tags": null,
//      "comments": "",
//      "start_date": "2025-11-25",
//      "finish_date": "2025-11-25"
