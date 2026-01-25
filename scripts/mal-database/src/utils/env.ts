import env from 'dotenv';
env.config();

const getEnv = (key: string): string => {
  const env = process.env[key]
  if (env == null) {
    throw new Error(`not set env ${key}`);
  }
  return env;
}

export const ENV = {
  get MAL_CLIENT_ID() {
    return getEnv('MAL_CLIENT_ID');
  },
  get MAL_CLIENT_SECRET() {
    return getEnv('MAL_CLIENT_SECRET');
  },
  get MAL_OAUTH_AUTHORIZE_URL() {
    return getEnv('MAL_OAUTH_AUTHORIZE_URL');
  },
  get MAL_OAUTH_REDIRECT_URI() {
    return getEnv('MAL_OAUTH_REDIRECT_URI');
  },
  get MAL_OAUTH_TOKEN_URL() {
    return getEnv('MAL_OAUTH_TOKEN_URL');
  }
}
