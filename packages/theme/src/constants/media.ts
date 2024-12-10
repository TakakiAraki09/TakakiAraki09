import { entries } from "../utils/entries";

export const SIZE = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

export const MATH = entries(SIZE).reduce((t, [value, key]) => {
  return {
    ...t,
    [key]: `(min-width:${value}px)`,
  };
}, {}) as { [key in keyof typeof SIZE]: string };
