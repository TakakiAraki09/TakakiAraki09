import { component$, OnRenderFn } from "@builder.io/qwik";
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
export type ContentProps = ContentAnimeProps | ContentNewsProps;

export const getContent = (content: ContentEntity): ContentProps => {
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
      throw new NotImplementedError(
        "Manga content type is not implemented yet",
      );
    default:
      throw new UnreachableError(content.contentType);
  }
};
export const createContent$ =
  <T extends Record<string, any>>(mapper: {
    payload: ContentEntity;
    animeMapper: (content: ContentAnimeProps) => T;
    newsMapper: (content: ContentNewsProps) => T;
  }) =>
  (
    onMount: OnRenderFn<{
      contentType: ContentProps["type"];
      payload: T;
    }>,
  ) => {
    const content = getContent(mapper.payload);

    const Content = component$<{
      contentType: ContentProps["type"];
      payload: T;
    }>(onMount);

    switch (content.type) {
      case "anime":
        return (
          <Content
            payload={mapper.animeMapper(content)}
            contentType={content.type}
          />
        );
      case "news":
        return (
          <Content
            payload={mapper.newsMapper(content)}
            contentType={content.type}
          />
        );
      default:
        throw new UnreachableError(content);
    }
  };

export const ContentSwitch = (
  type: ContentProps["type"],
  animeMapper: Children,
  newsMapper: Children,
) => {
  switch (type) {
    case "anime":
      return animeMapper;
    case "news":
      return newsMapper;
    default:
      throw new UnreachableError(type);
  }
};

