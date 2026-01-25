import { cva } from "~/styled-system/css";

export const toggleGroupStyle = cva({
  base: {
    display: "inline-flex",
    gap: "1",
  },
});

export const toggleGroupItemStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3",
    fontSize: "body",
    fontWeight: "medium",
    border: "1px solid",
    borderColor: "accent.primary",
    bg: "bg.primary",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
    _hover: {
      bg: "bg.secondary",
    },
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
    _first: {
      borderTopLeftRadius: "inner",
      borderBottomLeftRadius: "inner",
    },
    _last: {
      borderTopRightRadius: "inner",
      borderBottomRightRadius: "inner",
    },
  },
  variants: {
    pressed: {
      true: {
        bg: "bg.info",
        color: "contents.info",
        borderColor: "contents.info",
      },
    },
  },
});
