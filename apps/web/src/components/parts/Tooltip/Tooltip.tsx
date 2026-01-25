import { styled } from "~/styled-system/jsx";
import {
  tooltipStyle,
  tooltipTriggerStyle,
  tooltipContentStyle,
  tooltipArrowStyle,
} from "~/styles/tooltip";

export const Tooltip = styled("div", tooltipStyle);
export const TooltipTrigger = styled("div", tooltipTriggerStyle);
export const TooltipContent = styled("div", tooltipContentStyle);
export const TooltipArrow = styled("div", tooltipArrowStyle);
