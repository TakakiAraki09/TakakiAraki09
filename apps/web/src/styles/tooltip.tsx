import { cva } from "~/styled-system/css";

export const tooltipStyle = cva({
  base: {
    position: "relative",
    display: "inline-block",
  },
});

export const tooltipTriggerStyle = cva({
  base: {
    cursor: "pointer",
  },
});

export const tooltipContentStyle = cva({
  base: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: "2",
    padding: "2",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    fontSize: "sm",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    pointerEvents: "none",
  },
});

export const tooltipArrowStyle = cva({
  base: {
    position: "absolute",
    top: "100%",
    left: "50%",
    width: "2",
    height: "2",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderTop: "none",
    borderLeft: "none",
    transform: "translateX(-50%) rotate(45deg)",
    marginTop: "-1",
  },
});
