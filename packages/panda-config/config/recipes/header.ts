import type { RecipeConfig } from "@pandacss/dev";

export const header: RecipeConfig = {
  className: "header",
  description: "Button component styles",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "inner",
    fontFamily: "sans",
    fontWeight: "semibold",
    cursor: "pointer",
    transition: "all",
    transitionDuration: "fast",
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
};
