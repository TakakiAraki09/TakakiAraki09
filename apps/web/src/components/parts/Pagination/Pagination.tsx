import { styled } from "~/styled-system/jsx";
import {
  paginationStyle,
  paginationItemStyle,
  paginationEllipsisStyle,
} from "~/styles/pagination";

export const Pagination = styled("nav", paginationStyle);
export const PaginationItem = styled("button", paginationItemStyle);
export const PaginationEllipsis = styled("span", paginationEllipsisStyle);
