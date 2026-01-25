/**
 * Authenticate Entity
 *
 * MyAnimeListのOAuth認証情報を表すドメインモデル
 *
 * DB型（Authenticate）との違い：
 * - camelCaseのプロパティ名
 * - created_at は Date型（DB型は string）
 */
export interface AuthenticateEntity {
  id: number
  tokenType: string
  expiresIn: number
  accessToken: string
  refreshToken: string
  createdAt: Date
}
