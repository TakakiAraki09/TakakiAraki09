import type { NewAuthenticate } from '../types.ts'
import type { AuthenticateEntity } from '../entities/Authenticate.ts'

interface TokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

// MEMO: 依存性注入パターン
// - API層（fetchAccessToken）とRepository層（upsertAuthenticate）を直接importしない
// - 全ての依存性はScripts層から注入される（scripts/auth.ts参照）
// - これにより、層間の依存が一方向（Scripts → Usecase → API/Repository）になる
interface AuthenticateDeps {
  fetchAccessToken: (params: { code: string; codeVerifier: string }) => Promise<TokenResponse>
  upsertAuthenticate: (authenticate: NewAuthenticate) => Promise<AuthenticateEntity>
}

// MEMO: 高階関数パターン
// - authenticate(deps) で依存性を注入
// - 返り値の関数 async (params) => AuthenticateEntity が実際のUsecase
export const authenticate = ({
  fetchAccessToken,
  upsertAuthenticate,
}: AuthenticateDeps) => async ({
  code,
  codeVerifier,
}: {
  code: string
  codeVerifier: string
}) => {
  const tokenResponse = await fetchAccessToken({ code, codeVerifier })

  const authenticate = await upsertAuthenticate({
    token_type: tokenResponse.token_type,
    expires_in: tokenResponse.expires_in,
    access_token: tokenResponse.access_token,
    refresh_token: tokenResponse.refresh_token,
  })

  return authenticate
}
