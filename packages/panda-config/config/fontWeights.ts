import type { GetPandaConfigMap } from "./interfaces";

export const pandaFontWeights: GetPandaConfigMap<"fontWeights"> = {
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
};
