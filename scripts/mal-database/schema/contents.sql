
CREATE TABLE "content" (
    "id" varchar(36) not null primary key,
    "content_type" varchar(50) not null check(content_type in ('anime', 'manga', 'news'))
);

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
    "end_date" text,
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
CREATE TABLE "content_news" (
    "id" varchar(36) not null primary key,
    "guid" text not null,
    "title" varchar(255) not null,
    "link" text not null,
    "pub_date" text,
    "iso_date" text,
    "content" text,
    "og_image" text,
    "content_snippet" text,
    "created_at" timestamp default current_timestamp not null,
    unique (guid),
    foreign key (id) references content(id)
);

CREATE TABLE "content_state" (
    "id" varchar(36) not null primary key,
    "list_status_status" varchar(50) not null default 'empty' check(list_status_status in ('watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch', 'empty')),
    "list_status_score" integer,
    "list_status_num_episodes_watched" integer,
    "list_status_is_rewatching" integer,
    "list_status_updated_at" text,
    "list_status_start_date" text,
    "list_status_finish_date" text,
    "created_at" timestamp default current_timestamp not null,
    foreign key (id) references content(id)
);
