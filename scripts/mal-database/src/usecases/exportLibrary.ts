import { writeFileSync } from 'fs'
import { join } from 'path'
import { findAllContent, findAllContentAnime, findAllContentState } from '../repositories/ContentRepository.ts'
import { toContentEntity, toContentAnimeEntity, toContentStateEntity } from '../entities/index.ts'

interface ExportLibraryParams {
  outputDir?: string
}

export const exportLibrary = async ({
  outputDir = 'exports',
}: ExportLibraryParams = {}): Promise<void> => {
  console.log('Exporting library data...')

  // DBから全データを取得
  const contents = await findAllContent()
  const contentAnimes = await findAllContentAnime()
  const contentStates = await findAllContentState()

  console.log(`Found ${contents.length} contents, ${contentAnimes.length} content animes, and ${contentStates.length} content states`)

  // エンティティに変換
  const contentEntities = contents.map(toContentEntity)
  const contentAnimeEntities = contentAnimes.map(toContentAnimeEntity)
  const contentStateEntities = contentStates.map(toContentStateEntity)

  // JSONファイルに保存
  const contentPath = join(outputDir, 'content.json')
  const contentAnimePath = join(outputDir, 'content_anime.json')
  const contentStatePath = join(outputDir, 'content_state.json')

  writeFileSync(contentPath, JSON.stringify(contentEntities, null, 2), 'utf-8')
  writeFileSync(contentAnimePath, JSON.stringify(contentAnimeEntities, null, 2), 'utf-8')
  writeFileSync(contentStatePath, JSON.stringify(contentStateEntities, null, 2), 'utf-8')

  console.log(`Exported to ${contentPath}, ${contentAnimePath}, and ${contentStatePath}`)
  console.log('Export completed!')
}
