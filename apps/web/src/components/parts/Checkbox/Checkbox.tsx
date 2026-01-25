import { styled } from "~/styled-system/jsx";
import {
  checkboxStyle,
  checkboxInputStyle,
  checkboxLabelStyle,
} from "~/styles/checkbox";

export const Checkbox = styled("label", checkboxStyle);
export const CheckboxInput = styled("input", checkboxInputStyle);
export const CheckboxLabel = styled("span", checkboxLabelStyle);
