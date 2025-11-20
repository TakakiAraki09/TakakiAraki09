import type { GetPandaConfigMap } from "./interfaces";

export const pandaSizes: GetPandaConfigMap<"sizes"> = {
  cover: {
    sm: {
      w: { value: "64px" },
      h: { value: "96px" },
    },
  },
};
