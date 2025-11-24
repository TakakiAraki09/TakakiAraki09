import type { GetPandaConfigMap } from "./interfaces";

export const pandaRadii: GetPandaConfigMap<"radii"> = {
  inner: { value: "8px" },
  outer: { value: '16px' },
  full: { value: '9999px' },
};
