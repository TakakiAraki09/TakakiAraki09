import { describe, it, expect, vi, beforeEach } from "vitest";
import { getContent, ContentSwitch } from "./index";
import type {
  ContentEntity,
  ContentAnimeEntity,
  ContentNewsEntity,
} from "@repo/mal-database";

vi.mock("@repo/mal-database", () => ({
  getContentAnimeById: vi.fn(),
  getContentNewsById: vi.fn(),
  getContentStateById: vi.fn(),
}));

describe("entities/contents", () => {
  describe("getContent", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should return anime content when contentType is anime", async () => {
      const { getContentAnimeById, getContentStateById } = await import(
        "@repo/mal-database"
      );

      const mockAnimeEntity: ContentEntity = {
        id: "test-anime-id",
        contentType: "anime",
      };

      const mockAnimeData: Partial<ContentAnimeEntity> = {
        id: "test-anime-id",
        title: "Test Anime",
      };

      vi.mocked(getContentAnimeById).mockReturnValue(mockAnimeData as ContentAnimeEntity);
      vi.mocked(getContentStateById).mockReturnValue(undefined);

      const result = getContent(mockAnimeEntity);
      expect(result.type).toBe("anime");
      expect(result.payload).toBe(mockAnimeData);
    });

    it("should return news content when contentType is news", async () => {
      const { getContentNewsById, getContentStateById } = await import(
        "@repo/mal-database"
      );

      const mockNewsEntity: ContentEntity = {
        id: "test-news-id",
        contentType: "news",
      };

      const mockNewsData: Partial<ContentNewsEntity> = {
        id: "test-news-id",
        title: "Test News",
      };

      vi.mocked(getContentNewsById).mockReturnValue(mockNewsData as ContentNewsEntity);
      vi.mocked(getContentStateById).mockReturnValue(undefined);

      const result = getContent(mockNewsEntity);
      expect(result.type).toBe("news");
      expect(result.payload).toBe(mockNewsData);
    });

    it("should throw NotImplementedError for manga content", () => {
      const mockMangaEntity: ContentEntity = {
        id: "test-manga-id",
        contentType: "manga",
      };

      expect(() => getContent(mockMangaEntity)).toThrow(
        "Manga content type is not implemented yet",
      );
    });
  });

  describe("ContentSwitch", () => {
    it("should return animeMapper for anime type", () => {
      const animeContent = "Anime Content";
      const newsContent = "News Content";

      const result = ContentSwitch("anime", animeContent, newsContent);
      expect(result).toBe(animeContent);
    });

    it("should return newsMapper for news type", () => {
      const animeContent = "Anime Content";
      const newsContent = "News Content";

      const result = ContentSwitch("news", animeContent, newsContent);
      expect(result).toBe(newsContent);
    });
  });
});
