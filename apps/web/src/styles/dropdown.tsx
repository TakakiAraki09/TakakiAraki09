import { cva } from "~/styled-system/css";

export const dropdownStyle = cva({
  base: {
    position: "relative",
    display: "inline-block",
  },
});

export const dropdownTriggerStyle = cva({
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
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
  },
});

export const dropdownMenuStyle = cva({
  base: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: "1",
    minWidth: "40",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
});

export const dropdownItemStyle = cva({
  base: {
    display: "flex",
    alignItems: "center",
    padding: "3",
    fontSize: "body",
    cursor: "pointer",
    transition: "all 0.2s",
    _hover: {
      bg: "bg.secondary",
    },
  },
});
