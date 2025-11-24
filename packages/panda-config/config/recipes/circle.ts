
import type { RecipeConfig } from "@pandacss/dev";
export const circle: RecipeConfig = {
  className: "circle",
  description: "circle component styles",
  base: {
  },
  variants: {
    size: {
      sm: {
        padding: "8px 16px",
        fontSize: "sm",
      },
      md: {
        padding: "20px 20px",
        fontSize: "base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
};
