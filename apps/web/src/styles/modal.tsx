import { cva } from "~/styled-system/css";

export const modalOverlayStyle = cva({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bg: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
});

export const modalContentStyle = cva({
  base: {
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "120",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
  },
});

export const modalHeaderStyle = cva({
  base: {
    padding: "6",
    borderBottom: "1px solid",
    borderColor: "accent.primary",
  },
});

export const modalTitleStyle = cva({
  base: {
    fontSize: "xl",
    fontWeight: "bold",
  },
});

export const modalBodyStyle = cva({
  base: {
    padding: "6",
  },
});

export const modalFooterStyle = cva({
  base: {
    padding: "6",
    borderTop: "1px solid",
    borderColor: "accent.primary",
    display: "flex",
    justifyContent: "flex-end",
    gap: "3",
  },
});

export const modalCloseButtonStyle = cva({
  base: {
    position: "absolute",
    top: "4",
    right: "4",
    padding: "2",
    cursor: "pointer",
    border: "none",
    bg: "transparent",
    fontSize: "xl",
    transition: "all 0.2s",
    _hover: {
      opacity: 0.7,
    },
  },
});
