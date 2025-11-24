import type { Config } from "@pandacss/dev";

export const pandaBreakpoints: Required<
  Required<Config>["theme"]
>["extend"]["breakpoints"] = {
  mini: "390px", // iPhone 12/13 and similar
  sp: "430px",   // iPhone 14 Pro Max and similar
  tb: "768px",   // Tablets
  pc: "1024px",  // Desktop
};
