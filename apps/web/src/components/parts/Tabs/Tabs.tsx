import { styled } from "~/styled-system/jsx";
import {
  tabsStyle,
  tabsListStyle,
  tabsTriggerStyle,
  tabsContentStyle,
} from "~/styles/tabs";

export const Tabs = styled("div", tabsStyle);
export const TabsList = styled("div", tabsListStyle);
export const TabsTrigger = styled("button", tabsTriggerStyle);
export const TabsContent = styled("div", tabsContentStyle);
