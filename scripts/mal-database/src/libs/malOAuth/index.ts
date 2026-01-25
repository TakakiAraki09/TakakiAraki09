import { ENV } from "../../utils/env.ts";
import { generatePkcePair, generateState } from "../../utils/pkce.ts";

async function buildOAuthUrl() {
  const { codeVerifier, codeChallenge } = generatePkcePair();
  const url = new URL(ENV["MAL_OAUTH_AUTHORIZE_URL"]);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", ENV["MAL_CLIENT_ID"]);
  url.searchParams.set("redirect_uri", ENV["MAL_OAUTH_REDIRECT_URI"]);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "plain");
  url.searchParams.set("state", generateState(ENV["MAL_OAUTH_REDIRECT_URI"]));
  return {
    url,
    code_verifier: codeVerifier,
  };
}

interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

async function getToken({
  code,
  codeVerifier,
}: {
  codeVerifier: string;
  code: string;
}): Promise<TokenResponse> {
  const data = await fetch(ENV["MAL_OAUTH_TOKEN_URL"], {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: ENV["MAL_CLIENT_ID"],
      client_secret: ENV["MAL_CLIENT_SECRET"],
      grant_type: "authorization_code",
      code: code,
      code_verifier: codeVerifier,
      redirect_uri: ENV["MAL_OAUTH_REDIRECT_URI"],
    }),
  });

  return data.json() as Promise<TokenResponse>;
}
export const mal = {
  buildOAuthUrl,
  getToken,
};
