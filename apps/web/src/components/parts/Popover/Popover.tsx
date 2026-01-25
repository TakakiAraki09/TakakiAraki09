import { styled } from "~/styled-system/jsx";
import {
  popoverStyle,
  popoverTriggerStyle,
  popoverContentStyle,
  popoverArrowStyle,
} from "~/styles/popover";

export const Popover = styled("div", popoverStyle);
export const PopoverTrigger = styled("button", popoverTriggerStyle);
export const PopoverContent = styled("div", popoverContentStyle);
export const PopoverArrow = styled("div", popoverArrowStyle);
