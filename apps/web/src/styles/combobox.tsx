import { cva } from "~/styled-system/css";

export const comboboxStyle = cva({
  base: {
    position: "relative",
    width: "100%",
  },
});

export const comboboxInputStyle = cva({
  base: {
    width: "100%",
    padding: "3",
    fontSize: "body",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    outline: "none",
    bg: "bg.primary",
    transition: "all 0.2s",
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const comboboxListStyle = cva({
  base: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "1",
    maxHeight: "60",
    overflowY: "auto",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
});

export const comboboxOptionStyle = cva({
  base: {
    padding: "3",
    cursor: "pointer",
    fontSize: "body",
    transition: "all 0.2s",
    _hover: {
      bg: "bg.secondary",
    },
  },
});
