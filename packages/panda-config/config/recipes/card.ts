import type { RecipeConfig } from "@pandacss/dev";
export const card: RecipeConfig = {
  className: "card",
  description: "Button component styles",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "round",
    fontFamily: "sans",
    fontWeight: "semibold",
    cursor: "pointer",
    transition: "all",
    transitionDuration: "fast",
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
    variant: {
      primary: {
        backgroundColor: "purple.100",
        color: "black",
        "&:hover": {
          backgroundColor: "purple.200",
        },
      },
      secondary: {
        backgroundColor: "gray.100",
        color: "black",
        "&:hover": {
          backgroundColor: "gray.200",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
};
