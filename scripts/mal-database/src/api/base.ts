import constants from '../constants.ts';

const BASE_PATH = 'https://api.myanimelist.net';

// 過剰fetch対応：w
export const timer = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 5000)
  })
}

export const createMyAnimeListAPI = <T extends unknown>(endpoint: string) => {
  const api = new URL(BASE_PATH);
  api.pathname = endpoint;

  return async (parse: (url: URL) => URL) => {
    const result = await fetch(parse(api), {
      headers: {
        'Authorization': `Bearer ${constants.access_token}`
      }
    });

    await timer();
    return await result.json() as Promise<T>;
  }
};


