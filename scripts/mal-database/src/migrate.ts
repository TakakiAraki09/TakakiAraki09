import { sql } from 'kysely'
import { db } from './database.ts'

const migrate = async () => {
  await db.schema
    .createTable('person')
    .addColumn('id', 'integer', (cb) => cb.primaryKey().autoIncrement().notNull())
    .addColumn('first_name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('last_name', 'varchar(255)')
    .addColumn('gender', 'varchar(50)', (cb) => cb.notNull())
    .addColumn('created_at', 'timestamp', (cb) =>
      cb.notNull().defaultTo(sql`current_timestamp`)
    )
    .addColumn('metadata', 'text', (cb) => cb.notNull())
    .execute()

  await db.schema
    .createTable('pet')
    .addColumn('id', 'integer', (cb) => cb.primaryKey().autoIncrement().notNull())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('owner_id', 'integer', (cb) => cb.notNull())
    .addColumn('species', 'varchar(50)', (cb) => cb.notNull())
    .execute()

  console.log('petテーブルの作成が完了したのだ！')
  console.log('マイグレーションが全部完了したのだ！')
}

migrate()
  .catch((error) => {
    console.error('マイグレーションでエラーが発生したのだ！:', error)
    process.exit(1)
  })
  .finally(() => {
    db.destroy()
  })
