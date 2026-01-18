import { writeFileSync } from 'fs'
import { join } from 'path'
import { findAllContent, findAllContentAnime, findAllContentNews, findAllContentState } from '../repositories/ContentRepository.ts'
import { toContentEntity, toContentAnimeEntity, toContentStateEntity, toContentNewsEntity } from '../entities/index.ts'

interface ExportLibraryParams {
  outputDir?: string
}

export const exportLibrary = async ({
  outputDir = 'exports',
}: ExportLibraryParams = {}): Promise<void> => {
  console.log('Exporting library data...')

  // DBから全データを取得
  const [
    contents,
    contentAnimes,
    contentStates,
    contentNews,
  ] = await Promise.all([
    findAllContent(),
    findAllContentAnime(),
    findAllContentState(),
    findAllContentNews(),
  ])

  console.log(`Found ${contents.length} contents, ${contentAnimes.length} content animes, ${contentStates.length} content states, and ${contentNews.length} content news`)

  // エンティティに変換
  const contentEntities = contents.map(toContentEntity)
  const contentAnimeEntities = contentAnimes.map(toContentAnimeEntity)
  const contentStateEntities = contentStates.map(toContentStateEntity)
  const contentNewsEntities = contentNews.map(toContentNewsEntity)

  // JSONファイルに保存
  const contentPath = join(outputDir, 'content.json')
  const contentAnimePath = join(outputDir, 'content_anime.json')
  const contentStatePath = join(outputDir, 'content_state.json')
  const contentNewsPath = join(outputDir, 'content_news.json')

  writeFileSync(contentPath, JSON.stringify(contentEntities, null, 2), 'utf-8')
  writeFileSync(contentAnimePath, JSON.stringify(contentAnimeEntities, null, 2), 'utf-8')
  writeFileSync(contentStatePath, JSON.stringify(contentStateEntities, null, 2), 'utf-8')
  writeFileSync(contentNewsPath, JSON.stringify(contentNewsEntities, null, 2), 'utf-8')

  console.log(`Exported to ${contentPath}, ${contentAnimePath}, ${contentStatePath}, and ${contentNewsPath}q`)
  console.log('Export completed!')
}
