import { cva } from "~/styled-system/css";

export const checkboxStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2",
    cursor: "pointer",
  },
});

export const checkboxInputStyle = cva({
  base: {
    width: "5",
    height: "5",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    cursor: "pointer",
    transition: "all 0.2s",
    appearance: "none",
    bg: "bg.primary",
    position: "relative",
    _checked: {
      bg: "bg.info",
      borderColor: "contents.info",
      _after: {
        content: '""',
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "3",
        height: "3",
        bg: "contents.info",
        borderRadius: "inner",
      },
    },
    _focus: {
      boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const checkboxLabelStyle = cva({
  base: {
    fontSize: "body",
    cursor: "pointer",
    userSelect: "none",
  },
});
