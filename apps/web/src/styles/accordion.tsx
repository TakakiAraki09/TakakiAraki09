import { cva } from "~/styled-system/css";

export const accordionStyle = cva({
  base: {
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    overflow: "hidden",
  },
});

export const accordionItemStyle = cva({
  base: {
    borderBottom: "1px solid",
    borderColor: "accent.primary",
    _last: {
      borderBottom: "none",
    },
  },
});

export const accordionTriggerStyle = cva({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4",
    bg: "bg.primary",
    cursor: "pointer",
    fontSize: "body",
    fontWeight: "medium",
    transition: "all 0.2s",
    border: "none",
    outline: "none",
    textAlign: "left",
    _hover: {
      bg: "bg.secondary",
    },
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
  },
});

export const accordionContentStyle = cva({
  base: {
    padding: "4",
    bg: "bg.primary",
    fontSize: "body",
  },
});
