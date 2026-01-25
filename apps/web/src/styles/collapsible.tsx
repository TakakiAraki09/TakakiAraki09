import { cva } from "~/styled-system/css";

export const collapsibleStyle = cva({
  base: {
    width: "100%",
  },
});

export const collapsibleTriggerStyle = cva({
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
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    outline: "none",
    _hover: {
      bg: "bg.secondary",
    },
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
  },
});

export const collapsibleContentStyle = cva({
  base: {
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
  },
});
