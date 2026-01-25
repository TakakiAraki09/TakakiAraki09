import { ENV } from '../utils/env.ts'

interface TokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export const fetchAccessToken = async ({
  code,
  codeVerifier,
}: {
  code: string
  codeVerifier: string
}): Promise<TokenResponse> => {
  const params = new URLSearchParams({
    client_id: ENV.MAL_CLIENT_ID,
    client_secret: ENV.MAL_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
    redirect_uri: ENV.MAL_OAUTH_REDIRECT_URI,
  })

  const response = await fetch(ENV.MAL_OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch access token: ${response.status} ${errorText}`)
  }

  return await response.json() as TokenResponse
}

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string
}): Promise<TokenResponse> => {
  const params = new URLSearchParams({
    client_id: ENV.MAL_CLIENT_ID,
    client_secret: ENV.MAL_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })

  const response = await fetch(ENV.MAL_OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`)
  }

  return await response.json() as TokenResponse
}
