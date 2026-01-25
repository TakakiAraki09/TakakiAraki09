import { styled } from "~/styled-system/jsx";
import {
  dropdownStyle,
  dropdownTriggerStyle,
  dropdownMenuStyle,
  dropdownItemStyle,
} from "~/styles/dropdown";

export const Dropdown = styled("div", dropdownStyle);
export const DropdownTrigger = styled("button", dropdownTriggerStyle);
export const DropdownMenu = styled("div", dropdownMenuStyle);
export const DropdownItem = styled("div", dropdownItemStyle);
