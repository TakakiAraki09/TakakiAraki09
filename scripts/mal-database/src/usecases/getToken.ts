import type { AuthenticateEntity } from "../entities/Authenticate.ts";

const isTokenExpired = (createdAt: Date, expiresIn: number): boolean => {
  const expirationTime = new Date(createdAt.getTime() + expiresIn * 1000);
  const now = new Date();

  // MEMO: 有効期限の5分前をバッファとして設定（安全マージン）
  // - API呼び出し中にトークンが期限切れになるリスクを回避
  // - 期限切れギリギリではなく、余裕を持ってリフレッシュ
  const bufferMs = 5 * 60 * 1000;
  return now.getTime() >= expirationTime.getTime() - bufferMs;
};

// MEMO: 依存性注入パターン
// - このUsecaseはAPI層やRepository層を直接importしない
// - 全ての依存性はScripts層から注入される
// - テスト時にモック関数を注入できる
interface GetTokenDeps {
  findLatestAuthenticate: () => Promise<AuthenticateEntity | undefined>;
  refreshToken: () => Promise<AuthenticateEntity>;
}

// MEMO: 高階関数パターン
// - getToken(deps) で依存性を注入
// - 返り値の関数 async () => string が実際のUsecase
// - API呼び出しの度にこの関数が実行される（トークン自動リフレッシュの仕組み）
export const getToken = (deps: GetTokenDeps) => async (): Promise<string> => {
  const auth = await deps.findLatestAuthenticate();

  if (!auth) {
    throw new Error('No authentication found. Please run "pnpm auth" first.');
  }

  if (isTokenExpired(auth.createdAt, auth.expiresIn)) {
    console.log("Token expired or about to expire. Refreshing...");
    const refreshedAuth = await deps.refreshToken();
    return refreshedAuth.accessToken;
  }

  return auth.accessToken;
};
