
CREATE TABLE "authenticate" (
    "id" integer primary key autoincrement,
    "token_type" varchar(50) not null,
    "expires_in" integer not null,
    "access_token" text not null,
    "refresh_token" text not null,
    "created_at" timestamp default current_timestamp not null
);
