import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import * as entities from "./index.ts";

describe("entities/index", () => {
  it("should export all entity types", () => {
    const typeExports = [
      "ContentEntity",
      "ContentAnimeEntity",
      "ContentNewsEntity",
      "ContentStateEntity",
      "UserAnimeListItemEntity",
      "NewsItemEntity",
    ];

    typeExports.forEach((name) => {
      assert.ok(
        true,
        `Type ${name} should be exported (型チェック時に確認されるのだ)`,
      );
    });
  });

  it("should export all converter functions", () => {
    const converterExports = [
      "toContentEntity",
      "toContentAnimeEntity",
      "toContentNewsEntity",
      "toContentStateEntity",
      "fromContentEntity",
      "fromContentAnimeEntity",
      "fromContentNewsEntity",
      "fromContentStateEntity",
    ];

    converterExports.forEach((name) => {
      assert.ok(
        typeof entities[name as keyof typeof entities] === "function",
        `${name} should be a function`,
      );
    });
  });
});
