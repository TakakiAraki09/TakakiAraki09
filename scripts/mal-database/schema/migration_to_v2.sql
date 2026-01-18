-- Migration script: Split content table into content + content_anime
-- This script migrates from the old schema (single content table) to the new schema (content + content_anime tables)

-- Step 1: Create temporary backup table
CREATE TABLE "content_backup" AS SELECT * FROM "content";

-- Step 2: Drop old content table
DROP TABLE "content";

-- Step 3: Create new content table (parent table)
CREATE TABLE "content" (
    "id" varchar(36) not null primary key,
    "content_type" varchar(50) not null check(content_type in ('anime', 'manga'))
);

-- Step 4: Create new content_anime table (child table)
CREATE TABLE "content_anime" (
    "id" varchar(36) not null primary key,
    "myanimelist_id" integer not null,
    "title" varchar(255) not null,
    "main_picture_medium" text,
    "main_picture_large" text,
    "alternative_titles_en" text,
    "alternative_titles_ja" text,
    "alternative_titles_synonyms" text,
    "start_date" text,
    "synopsis" text,
    "mean" real,
    "rank" integer,
    "popularity" integer,
    "num_list_users" integer,
    "num_scoring_users" integer,
    "nsfw" varchar(50),
    "mal_created_at" text,
    "mal_updated_at" text,
    "media_type" varchar(50),
    "status" varchar(50),
    "genres" text,
    "created_at" timestamp default current_timestamp not null,
    unique (myanimelist_id),
    foreign key (id) references content(id)
);

-- Step 5: Migrate data to content table
INSERT INTO "content" ("id", "content_type")
SELECT "id", "content_type" FROM "content_backup";

-- Step 6: Migrate data to content_anime table
INSERT INTO "content_anime" (
    "id",
    "myanimelist_id",
    "title",
    "main_picture_medium",
    "main_picture_large",
    "alternative_titles_en",
    "alternative_titles_ja",
    "alternative_titles_synonyms",
    "start_date",
    "synopsis",
    "mean",
    "rank",
    "popularity",
    "num_list_users",
    "num_scoring_users",
    "nsfw",
    "mal_created_at",
    "mal_updated_at",
    "media_type",
    "status",
    "genres",
    "created_at"
)
SELECT
    "id",
    "myanimelist_id",
    "title",
    "main_picture_medium",
    "main_picture_large",
    "alternative_titles_en",
    "alternative_titles_ja",
    "alternative_titles_synonyms",
    "start_date",
    "synopsis",
    "mean",
    "rank",
    "popularity",
    "num_list_users",
    "num_scoring_users",
    "nsfw",
    "mal_created_at",
    "mal_updated_at",
    "media_type",
    "status",
    "genres",
    "created_at"
FROM "content_backup";

-- Step 7: Drop backup table (optional - comment out if you want to keep the backup)
DROP TABLE "content_backup";

-- Migration completed successfully!
