import { cva } from "~/styled-system/css";

export const labelStyle = cva({
  base: {
    display: "inline-block",
    fontSize: "body",
    fontWeight: "medium",
    marginBottom: "2",
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    variant: {
      default: {
        color: "accent.primary",
      },
      required: {
        color: "contents.error",
        _after: {
          content: '" *"',
          marginLeft: "1",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
