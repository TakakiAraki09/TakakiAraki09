import { cva } from "~/styled-system/css";

export const separatorStyle = cva({
  base: {
    bg: "accent.primary",
    flexShrink: 0,
  },
  variants: {
    orientation: {
      horizontal: {
        height: "1px",
        width: "100%",
      },
      vertical: {
        width: "1px",
        height: "100%",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
