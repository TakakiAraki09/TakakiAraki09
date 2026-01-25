import { styled } from "~/styled-system/jsx";
import {
  carouselStyle,
  carouselViewportStyle,
  carouselContainerStyle,
  carouselItemStyle,
  carouselButtonStyle,
} from "~/styles/carousel";

export const Carousel = styled("div", carouselStyle);
export const CarouselViewport = styled("div", carouselViewportStyle);
export const CarouselContainer = styled("div", carouselContainerStyle);
export const CarouselItem = styled("div", carouselItemStyle);
export const CarouselButton = styled("button", carouselButtonStyle);
