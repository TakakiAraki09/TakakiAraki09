import type { Config } from "@pandacss/dev";

export type GetPandaConfigThemeMap<
  T extends keyof Required<Required<Config>["theme"]>,
> = Required<Required<Config>["theme"]>[T];
export type GetPandaConfigMap<
  T extends keyof Required<Required<Config>["theme"]>["tokens"],
> = Required<Required<Config>["theme"]>["tokens"][T];
export type GetPandaSematicToken<
  T extends keyof Required<Required<Config>["theme"]>["semanticTokens"],
> = Required<Required<Config>["theme"]>["semanticTokens"][T];
