import type { NewAuthenticate } from "../types.ts";
import type { AuthenticateEntity } from "../entities/Authenticate.ts";

interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

interface RefreshTokenDeps {
  refreshAccessToken: (params: {
    refreshToken: string;
  }) => Promise<TokenResponse>;
  findLatestAuthenticate: () => Promise<AuthenticateEntity | undefined>;
  upsertAuthenticate: (
    authenticate: NewAuthenticate,
  ) => Promise<AuthenticateEntity>;
}

export const refreshToken = (deps: RefreshTokenDeps) => async () => {
  const currentAuth = await deps.findLatestAuthenticate();

  if (!currentAuth) {
    throw new Error("No authentication found. Please authenticate first.");
  }

  const tokenResponse = await deps.refreshAccessToken({
    refreshToken: currentAuth.refreshToken,
  });

  const updatedAuth = await deps.upsertAuthenticate({
    token_type: tokenResponse.token_type,
    expires_in: tokenResponse.expires_in,
    access_token: tokenResponse.access_token,
    refresh_token: tokenResponse.refresh_token,
  });

  return updatedAuth;
};
