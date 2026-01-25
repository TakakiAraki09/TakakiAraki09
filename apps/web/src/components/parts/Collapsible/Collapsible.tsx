import { styled } from "~/styled-system/jsx";
import {
  collapsibleStyle,
  collapsibleTriggerStyle,
  collapsibleContentStyle,
} from "~/styles/collapsible";

export const Collapsible = styled("div", collapsibleStyle);
export const CollapsibleTrigger = styled("button", collapsibleTriggerStyle);
export const CollapsibleContent = styled("div", collapsibleContentStyle);
