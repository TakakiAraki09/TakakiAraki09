import { styled } from "~/styled-system/jsx";
import { toggleGroupStyle, toggleGroupItemStyle } from "~/styles/toggle-group";

export const ToggleGroup = styled("div", toggleGroupStyle);
export const ToggleGroupItem = styled("button", toggleGroupItemStyle);
