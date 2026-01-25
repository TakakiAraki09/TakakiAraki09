import { cva } from "~/styled-system/css";

export const progressStyle = cva({
  base: {
    width: "100%",
    overflow: "hidden",
    bg: "bg.secondary",
    borderRadius: "inner",
  },
  variants: {
    size: {
      small: {
        height: "2",
      },
      medium: {
        height: "3",
      },
      large: {
        height: "4",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const progressBarStyle = cva({
  base: {
    height: "100%",
    bg: "bg.info",
    transition: "width 0.3s ease-in-out",
  },
  variants: {
    variant: {
      info: {
        bg: "bg.info",
      },
      success: {
        bg: "bg.success",
      },
      error: {
        bg: "bg.error",
      },
      warning: {
        bg: "bg.warn",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});
