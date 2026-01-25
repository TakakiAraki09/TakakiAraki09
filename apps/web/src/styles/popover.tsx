import { cva } from "~/styled-system/css";

export const popoverStyle = cva({
  base: {
    position: "relative",
    display: "inline-block",
  },
});

export const popoverTriggerStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3",
    fontSize: "body",
    fontWeight: "medium",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    bg: "bg.primary",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
    _hover: {
      bg: "bg.secondary",
    },
  },
});

export const popoverContentStyle = cva({
  base: {
    position: "absolute",
    marginTop: "2",
    minWidth: "60",
    padding: "4",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
});

export const popoverArrowStyle = cva({
  base: {
    position: "absolute",
    width: "3",
    height: "3",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    transform: "rotate(45deg)",
  },
});
