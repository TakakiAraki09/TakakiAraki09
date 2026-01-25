import { syncUserAnimeList } from "../usecases/syncUserAnimeList.ts";
import { syncNews } from "../usecases/syncNews.ts";
import { getToken } from "../usecases/getToken.ts";
import { refreshToken } from "../usecases/refreshToken.ts";
import { refreshAccessToken } from "../api/oauth.ts";
import {
  findLatestAuthenticate,
  upsertAuthenticate,
} from "../repositories/AuthenticateRepository.ts";
import { initializeAPI } from "../api/base.ts";

const userName = "araki0809";

const main = async () => {
  console.log("Starting data synchronization...");

  // MEMO: 依存性注入パターン - Scripts層で全ての依存性を組み立てる
  // 1. refreshTokenUsecaseを作成（API層とRepository層の関数を注入）
  const refreshTokenUsecase = refreshToken({
    refreshAccessToken, // API層
    findLatestAuthenticate, // Repository層
    upsertAuthenticate, // Repository層
  });

  // 2. getTokenUsecaseを作成（Repository層とrefreshTokenUsecaseを注入）
  const getTokenUsecase = getToken({
    findLatestAuthenticate, // Repository層
    refreshToken: refreshTokenUsecase, // 他のUsecase
  });

  // 3. APIを初期化（getTokenUsecaseを注入）
  // MEMO: Promise<string>を渡すことで、API呼び出しの度に有効期限チェック＋自動リフレッシュ
  initializeAPI(getTokenUsecase);

  const syncAnimeContent = async () => {
    console.log("Syncing user anime list...");
    await syncUserAnimeList({
      userName,
      contentType: "anime",
      limit: 500,
      rateLimitMs: 500,
    });
    console.log("User anime list sync completed!");
  };

  const syncNewsContent = async () => {
    console.log("Syncing news...");
    await syncNews({
      upsert: true,
    });
    console.log("News sync completed!");
  };
  return await Promise.all([syncAnimeContent(), syncNewsContent()]);
};

main()
  .then(() => {
    console.log("All sync tasks completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Sync failed:", error);
    process.exit(1);
  });
