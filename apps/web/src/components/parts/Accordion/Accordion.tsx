import { styled } from "~/styled-system/jsx";
import {
  accordionStyle,
  accordionItemStyle,
  accordionTriggerStyle,
  accordionContentStyle,
} from "~/styles/accordion";

export const Accordion = styled("div", accordionStyle);
export const AccordionItem = styled("div", accordionItemStyle);
export const AccordionTrigger = styled("button", accordionTriggerStyle);
export const AccordionContent = styled("div", accordionContentStyle);
