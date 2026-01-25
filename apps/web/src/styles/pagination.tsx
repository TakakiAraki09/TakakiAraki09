import { cva } from "~/styled-system/css";

export const paginationStyle = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
  },
});

export const paginationItemStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "10",
    padding: "2",
    fontSize: "body",
    fontWeight: "medium",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    bg: "bg.primary",
    cursor: "pointer",
    transition: "all 0.2s",
    _hover: {
      bg: "bg.secondary",
    },
  },
  variants: {
    active: {
      true: {
        bg: "bg.info",
        color: "contents.info",
        borderColor: "contents.info",
      },
    },
  },
});

export const paginationEllipsisStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "10",
    padding: "2",
    fontSize: "body",
  },
});
