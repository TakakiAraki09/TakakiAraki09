import { cva } from "~/styled-system/css";

export const tabsStyle = cva({
  base: {
    width: "100%",
  },
});

export const tabsListStyle = cva({
  base: {
    display: "flex",
    borderBottom: "2px solid",
    borderColor: "accent.primary",
  },
});

export const tabsTriggerStyle = cva({
  base: {
    padding: "3",
    fontSize: "body",
    fontWeight: "medium",
    cursor: "pointer",
    border: "none",
    bg: "transparent",
    borderBottom: "2px solid transparent",
    marginBottom: "-2px",
    transition: "all 0.2s",
    outline: "none",
    _hover: {
      bg: "bg.secondary",
    },
  },
  variants: {
    active: {
      true: {
        borderBottomColor: "contents.info",
        color: "contents.info",
      },
    },
  },
});

export const tabsContentStyle = cva({
  base: {
    padding: "4",
  },
});
