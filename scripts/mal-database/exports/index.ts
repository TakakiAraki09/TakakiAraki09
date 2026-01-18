import type { ContentEntity, ContentStateEntity } from '../src/entities/index.ts'
// JSONファイルを静的にインポート（Viteがビルド時にバンドルに含める）
import contentData from './content.json'
import contentStateData from './content_state.json'

// 型アサーションでJSONデータをエンティティ型として扱う
const contentsCache = contentData as unknown as ContentEntity[]
const contentStatesCache = contentStateData as unknown as ContentStateEntity[]

export const getContents = (): ContentEntity[] => {
  return contentsCache
}

export const getContentStates = (): ContentStateEntity[] => {
  return contentStatesCache
}

// ID指定で取得
export const getContentById = (id: string): ContentEntity | undefined => {
  const contents = getContents()
  return contents.find(content => content.id === id)
}

export const getContentStateById = (id: string): ContentStateEntity | undefined => {
  const contentStates = getContentStates()
  return contentStates.find(state => state.id === id)
}

// MyAnimeList IDで取得
export const getContentByMalId = (myanimelistId: number): ContentEntity | undefined => {
  const contents = getContents()
  return contents.find(content => content.myanimelistId === myanimelistId)
}

// タイトルで検索（部分一致）
export const searchContentsByTitle = (searchTerm: string): ContentEntity[] => {
  const contents = getContents()
  const lowerSearchTerm = searchTerm.toLowerCase()
  return contents.filter(content =>
    content.title.toLowerCase().includes(lowerSearchTerm)
  )
}

// ステータスでフィルタ
export const getContentStatesByStatus = (
  status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch' | 'empty'
): ContentStateEntity[] => {
  const contentStates = getContentStates()
  return contentStates.filter(state => state.listStatusStatus === status)
}

// 互換性のためのエクスポート
export const contents = contentsCache
export const contentStates = contentStatesCache
