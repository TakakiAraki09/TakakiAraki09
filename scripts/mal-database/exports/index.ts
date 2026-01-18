import type { ContentEntity, ContentStateEntity } from '../src/entities/index.ts'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadJsonFile = <T>(filename: string): T[] => {
  const filePath = join(__dirname, filename)

  if (!existsSync(filePath)) {
    console.warn(`Warning: ${filename} not found. Please run exportLibrary first.`)
    return []
  }

  const data = readFileSync(filePath, 'utf-8')
  return JSON.parse(data) as T[]
}

export const getContents = (): ContentEntity[] => {
  return loadJsonFile<ContentEntity>('content.json')
}

export const getContentStates = (): ContentStateEntity[] => {
  return loadJsonFile<ContentStateEntity>('content_state.json')
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
export const contents = getContents()
export const contentStates = getContentStates()
