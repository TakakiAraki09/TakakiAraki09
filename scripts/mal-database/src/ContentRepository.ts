import { db } from './database.ts'
import type { Content, NewContent, NewContentState } from './types.ts'

export const findContentByMalId = async (
  myanimelist_id: number,
  content_type: 'anime' | 'manga'
) => {
  return await db
    .selectFrom('content')
    .where('myanimelist_id', '=', myanimelist_id)
    .where('content_type', '=', content_type)
    .selectAll()
    .executeTakeFirst()
}

export const createContent = async (content: NewContent) => {
  return await db
    .insertInto('content')
    .values(content)
    .returningAll()
    .executeTakeFirstOrThrow()
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
    return await db
      .updateTable('content_state')
      .set(contentState)
      .where('id', '=', contentState.id)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  return await createContentState(contentState)
}
