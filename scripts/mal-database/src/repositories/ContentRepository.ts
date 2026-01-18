import { db } from '../database.ts'
import type { Content, ContentAnime, ContentState, NewContent, NewContentAnime, NewContentState } from '../types.ts'

export const findContentByMalId = async (
  myanimelist_id: number,
  content_type: 'anime' | 'manga'
): Promise<Content | undefined> => {
  const contentAnime = await db
    .selectFrom('content_anime')
    .where('content_anime.myanimelist_id', '=', myanimelist_id)
    .selectAll()
    .executeTakeFirst()

  if (!contentAnime) {
    return undefined
  }

  return await db
    .selectFrom('content')
    .where('content.id', '=', contentAnime.id)
    .where('content.content_type', '=', content_type)
    .selectAll()
    .executeTakeFirst()
}

export const findContentAnimeByMalId = async (
  myanimelist_id: number
): Promise<ContentAnime | undefined> => {
  return await db
    .selectFrom('content_anime')
    .where('content_anime.myanimelist_id', '=', myanimelist_id)
    .selectAll()
    .executeTakeFirst()
}

export const createContent = async (content: NewContent, contentAnime: NewContentAnime) => {
  const createdContent = await db
    .insertInto('content')
    .values(content)
    .returningAll()
    .executeTakeFirstOrThrow()

  const createdContentAnime = await db
    .insertInto('content_anime')
    .values(contentAnime)
    .returningAll()
    .executeTakeFirstOrThrow()

  return { content: createdContent, contentAnime: createdContentAnime }
}

export const createContentState = async (contentState: NewContentState) => {
  return await db
    .insertInto('content_state')
    .values(contentState)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export const upsertContentState = async (contentState: NewContentState) => {
  const existing = await db
    .selectFrom('content_state')
    .where('id', '=', contentState.id)
    .selectAll()
    .executeTakeFirst()

  if (existing) {
    const { created_at, ...updateData } = contentState
    return await db
      .updateTable('content_state')
      .set(updateData)
      .where('id', '=', contentState.id)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  return await createContentState(contentState)
}

export const findAllContent = async (): Promise<Content[]> => {
  return await db
    .selectFrom('content')
    .selectAll()
    .execute()
}

export const findAllContentAnime = async (): Promise<ContentAnime[]> => {
  return await db
    .selectFrom('content_anime')
    .selectAll()
    .execute()
}

export const findAllContentState = async (): Promise<ContentState[]> => {
  return await db
    .selectFrom('content_state')
    .selectAll()
    .execute()
}
