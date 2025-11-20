import type { Config } from "@pandacss/dev";

export const pandaBreakpoints: Required<
  Required<Config>["theme"]
>["extend"]["breakpoints"] = {
  sm: "390px", // iPhone 12/13 and similar
  md: "430px", // iPhone 14 Pro Max and similar
  lg: "768px", // Tablets
  xl: "1024px", // Desktop
};
