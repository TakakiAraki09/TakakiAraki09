import { styled } from "~/styled-system/jsx";
import {
  selectStyle,
  selectTriggerStyle,
  selectContentStyle,
  selectOptionStyle,
} from "~/styles/select";

export const Select = styled("select", selectStyle);
export const SelectTrigger = styled("button", selectTriggerStyle);
export const SelectContent = styled("div", selectContentStyle);
export const SelectOption = styled("div", selectOptionStyle);
