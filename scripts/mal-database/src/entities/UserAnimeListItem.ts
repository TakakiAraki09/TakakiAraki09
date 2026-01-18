export interface UserAnimeListItemEntity {
  malId: number
  title: string
  status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'
  score: number
  numEpisodesWatched: number
  isRewatching: boolean
  updatedAt: Date | null
  startDate: Date | null
  finishDate: Date | null
}
