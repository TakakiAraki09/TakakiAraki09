import type {
  ContentAnimeEntity,
  ContentNewsEntity,
  ContentStateEntity,
  ContentEntity,
} from "@repo/mal-database";
import {
  getContentAnimeById,
  getContentNewsById,
  getContentStateById,
} from "@repo/mal-database";
import { Children } from "~/interfaces/components";
import { NotImplementedError } from "~/utils/errors/NotImplemented";
import { UnreachableError } from "~/utils/errors/UnreachableError";

export type ContentProps = {
  payload: ContentEntity;
};
/**
 * 1) ドメイン：ContentEntity -> 型付きの ContentData に正規化
 */
export type ContentAnimeProps = {
  type: "anime";
  payload: ContentAnimeEntity;
  state?: ContentStateEntity;
};

export type ContentNewsProps = {
  type: "news";
  payload: ContentNewsEntity;
  state?: ContentStateEntity;
};

export type ContentData = ContentAnimeProps | ContentNewsProps;
export type ContentType = ContentData["type"];

/**
 * ContentData の type から対応する props 型を引く（これが型安全 dispatch の核）
 */
export type ContentOf<T extends ContentType> = Extract<ContentData, { type: T }>;

/**
 * 対応している contentType のみを抽出
 * - ContentEntity 側に manga 等があっても、ContentData に含めない限り mapper を強制しない
 */
export type SupportedContentType = Extract<ContentEntity["contentType"], ContentType>;

/**
 * ContentEntity -> ContentData
 */
export const getContentData = (content: ContentEntity): ContentData => {
  switch (content.contentType) {
    case "anime": {
      const anime = getContentAnimeById(content.id);
      if (!anime) throw new Error(`Anime with id ${content.id} not found`);
      return {
        type: "anime",
        payload: anime,
        state: getContentStateById(content.id),
      };
    }
    case "news": {
      const news = getContentNewsById(content.id);
      if (!news) throw new Error(`News with id ${content.id} not found`);
      return {
        type: "news",
        payload: news,
        state: getContentStateById(content.id),
      };
    }
    case "manga":
      throw new NotImplementedError("Manga content type is not implemented yet");
    default:
      throw new UnreachableError(content.contentType);
  }
};

/**
 * 2) 型安全な mapper 定義
 * - anime には ContentAnimeProps
 * - news には ContentNewsProps
 * が必ず渡る（TS2322 を発生させない）
 */
export type ContentMapper<R> = {
  [K in SupportedContentType]: (content: ContentOf<K>) => R;
};

/**
 * 3) mapper 実行ユーティリティ（命名は use～ でも良いが、Hook ではないので通常関数として整理）
 */
export const mapContent = <R>(args: {
  content: ContentEntity;
  mapper: ContentMapper<R>;
}): R => {
  const contentData = getContentData(args.content);

  switch (contentData.type) {
    case "anime":
      return args.mapper.anime(contentData);
    case "news":
      return args.mapper.news(contentData);
    default:
      // ContentData の union が増えたらここでコンパイルエラーにしたいので残す
      throw new UnreachableError(contentData);
  }
};

/**
 * 4) JSX の分岐ユーティリティ（必要なら）
 * - ContentType の増減に追随
 */
export const ContentSwitch = (args: {
  type: ContentType;
  anime: Children;
  news: Children;
}): Children => {
  switch (args.type) {
    case "anime":
      return args.anime;
    case "news":
      return args.news;
    default:
      throw new UnreachableError(args.type);
  }
};