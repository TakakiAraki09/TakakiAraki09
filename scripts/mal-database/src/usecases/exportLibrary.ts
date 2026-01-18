import { writeFileSync } from 'fs'
import { join } from 'path'
import { findAllContent, findAllContentState } from '../repositories/ContentRepository.ts'
import { toContentEntity, toContentStateEntity } from '../entities/index.ts'

interface ExportLibraryParams {
  outputDir?: string
}

export const exportLibrary = async ({
  outputDir = 'exports',
}: ExportLibraryParams = {}): Promise<void> => {
  console.log('Exporting library data...')

  // DBから全データを取得
  const contents = await findAllContent()
  const contentStates = await findAllContentState()

  console.log(`Found ${contents.length} contents and ${contentStates.length} content states`)

  // エンティティに変換
  const contentEntities = contents.map(toContentEntity)
  const contentStateEntities = contentStates.map(toContentStateEntity)

  // JSONファイルに保存
  const contentPath = join(outputDir, 'content.json')
  const contentStatePath = join(outputDir, 'content_state.json')

  writeFileSync(contentPath, JSON.stringify(contentEntities, null, 2), 'utf-8')
  writeFileSync(contentStatePath, JSON.stringify(contentStateEntities, null, 2), 'utf-8')

  console.log(`Exported to ${contentPath} and ${contentStatePath}`)
  console.log('Export completed!')
}
