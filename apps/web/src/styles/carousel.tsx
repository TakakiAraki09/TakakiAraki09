import { cva } from "~/styled-system/css";

export const carouselStyle = cva({
  base: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
});

export const carouselViewportStyle = cva({
  base: {
    overflow: "hidden",
    width: "100%",
  },
});

export const carouselContainerStyle = cva({
  base: {
    display: "flex",
    transition: "transform 0.3s ease-in-out",
  },
});

export const carouselItemStyle = cva({
  base: {
    minWidth: "100%",
    flex: "0 0 auto",
  },
});

export const carouselButtonStyle = cva({
  base: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bg: "bg.primary",
    border: "1px solid",
    borderColor: "accent.primary",
    borderRadius: "inner",
    padding: "2",
    cursor: "pointer",
    transition: "all 0.2s",
    _hover: {
      bg: "bg.secondary",
    },
  },
  variants: {
    direction: {
      prev: {
        left: "2",
      },
      next: {
        right: "2",
      },
    },
  },
});
