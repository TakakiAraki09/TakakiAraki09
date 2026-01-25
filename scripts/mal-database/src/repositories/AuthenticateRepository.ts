import { db } from '../database.ts'
import type { NewAuthenticate } from '../types.ts'
import type { AuthenticateEntity } from '../entities/Authenticate.ts'
import { toAuthenticateEntity } from '../entities/converters.ts'

export const createAuthenticate = async (authenticate: NewAuthenticate): Promise<AuthenticateEntity> => {
  const result = await db
    .insertInto('authenticate')
    .values(authenticate)
    .returningAll()
    .executeTakeFirstOrThrow()

  return toAuthenticateEntity(result)
}

export const findLatestAuthenticate = async (): Promise<AuthenticateEntity | undefined> => {
  const result = await db
    .selectFrom('authenticate')
    .selectAll()
    .orderBy('created_at', 'desc')
    .limit(1)
    .executeTakeFirst()

  return result ? toAuthenticateEntity(result) : undefined
}

export const upsertAuthenticate = async (authenticate: NewAuthenticate): Promise<AuthenticateEntity> => {
  const existing = await findLatestAuthenticate()

  if (existing) {
    const { created_at, ...updateData } = authenticate
    const result = await db
      .updateTable('authenticate')
      .set(updateData)
      .where('id', '=', existing.id)
      .returningAll()
      .executeTakeFirstOrThrow()

    return toAuthenticateEntity(result)
  }

  return await createAuthenticate(authenticate)
}
