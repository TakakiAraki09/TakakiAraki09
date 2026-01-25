// JSONファイルを静的にインポート（Viteがビルド時にバンドルに含める）
import contentData from "./content.json";
import contentAnimeData from "./content_anime.json";
import contentStateData from "./content_state.json";
import contentNewsData from "./content_news.json";
import type {
  ContentAnimeEntity,
  ContentEntity,
  ContentNewsEntity,
} from "../src/entities/Content.ts";
import type { ContentStateEntity } from "../src/entities/ContentState.ts";
// TODO: importが変だからlibrary buildを行う

// 型アサーションでJSONデータをエンティティ型として扱う
const contentsCache = contentData as unknown as ContentEntity[];
const contentAnimesCache = contentAnimeData as unknown as ContentAnimeEntity[];
const contentStatesCache = contentStateData as unknown as ContentStateEntity[];
const contentNewsCache = contentNewsData as unknown as ContentNewsEntity[];

export const getContents = (): ContentEntity[] => {
  return contentsCache;
};

export const getContentAnimes = (): ContentAnimeEntity[] => {
  return contentAnimesCache;
};

export const getContentStates = (): ContentStateEntity[] => {
  return contentStatesCache;
};
export const getContentNews = (): ContentNewsEntity[] => {
  return contentNewsCache;
};

// ID指定で取得
export const getContentById = (id: string): ContentEntity | undefined => {
  const contents = getContents();
  return contents.find((content) => content.id === id);
};

export const getContentAnimeById = (
  id: string,
): ContentAnimeEntity | undefined => {
  const contentAnimes = getContentAnimes();
  return contentAnimes.find((anime) => anime.id === id);
};

export const getContentStateById = (
  id: string,
): ContentStateEntity | undefined => {
  const contentStates = getContentStates();
  return contentStates.find((state) => state.id === id);
};

export const getContentNewsById = (
  id: string,
): ContentNewsEntity | undefined => {
  const contentNews = getContentNews();
  return contentNews.find((news) => news.id === id);
};

// MyAnimeList IDで取得
export const getContentAnimeByMalId = (
  myanimelistId: number,
): ContentAnimeEntity | undefined => {
  const contentAnimes = getContentAnimes();
  return contentAnimes.find((anime) => anime.myanimelistId === myanimelistId);
};

// タイトルで検索（部分一致）
export const searchContentAnimesByTitle = (
  searchTerm: string,
): ContentAnimeEntity[] => {
  const contentAnimes = getContentAnimes();
  const lowerSearchTerm = searchTerm.toLowerCase();
  return contentAnimes.filter((anime) =>
    anime.title.toLowerCase().includes(lowerSearchTerm),
  );
};

// ステータスでフィルタ
export const getContentStatesByStatus = (
  status:
    | "watching"
    | "completed"
    | "on_hold"
    | "dropped"
    | "plan_to_watch"
    | "empty",
): ContentStateEntity[] => {
  const contentStates = getContentStates();
  return contentStates.filter((state) => state.listStatusStatus === status);
};

// 互換性のためのエクスポート
export const contents = contentsCache;
export const contentAnimes = contentAnimesCache;
export const contentStates = contentStatesCache;
export const contentNews = contentNewsCache;

export type {
  ContentEntity,
  ContentAnimeEntity,
  ContentStateEntity,
  ContentNewsEntity,
};
