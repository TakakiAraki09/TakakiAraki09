const BASE_PATH = 'https://api.myanimelist.net';

// 過剰fetch対応：w
export const timer = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 5000)
  })
}

// MEMO: なぜPromise<string>（関数）を渡すのか？
// - string（固定トークン）だと、長時間実行時に期限切れになっても気づけない
// - Promise<string>（関数）なら、API呼び出しの度に有効期限チェック＆自動リフレッシュが可能
// - getToken Usecase内で5分の安全マージンを持たせて、期限切れ前に自動リフレッシュ
// - バッチ処理で長時間実行する可能性があるため、この設計が最適
let getTokenInstance: (() => Promise<string>) | null = null

export const initializeAPI = (getToken: () => Promise<string>) => {
  getTokenInstance = getToken
}

export const createMyAnimeListAPI = <T extends unknown>(endpoint: string) => {
  const api = new URL(BASE_PATH);
  api.pathname = endpoint;

  return async (parse: (url: URL) => URL) => {
    if (!getTokenInstance) {
      throw new Error('API not initialized. Call initializeAPI first.')
    }

    const accessToken = await getTokenInstance()
    const parsedUrl = parse(api)

    const result = await fetch(parsedUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    await timer();

    // HTTPステータスコードをチェック
    if (!result.ok) {
      const errorBody = await result.text()
      throw new Error(
        `MyAnimeList API Error:\n` +
        `  Endpoint: ${parsedUrl.pathname}${parsedUrl.search}\n` +
        `  Status: ${result.status} ${result.statusText}\n` +
        `  Response: ${errorBody}`
      )
    }

    return await result.json() as Promise<T>;
  }
};
