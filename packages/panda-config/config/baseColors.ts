import type { GetPandaConfigMap } from "./interfaces";

const createOklch = (l: number) => {
  return {
    100: { value: `oklch(94% 0.12 ${l})` },
    200: { value: `oklch(89% 0.12 ${l})` },
    300: { value: `oklch(83% 0.12 ${l})` },
    400: { value: `oklch(74% 0.12 ${l})` },
    500: { value: `oklch(63% 0.12 ${l})` },
    600: { value: `oklch(52% 0.12 ${l})` },
    700: { value: `oklch(42% 0.12 ${l})` },
    800: { value: `oklch(32% 0.12 ${l})` },
    900: { value: `oklch(24% 0.12 ${l})` },
  };
};
const types = {
  gray: 250,
  blue: 260,
  green: 145,
  red: 40,
  yellow: 85,
};
export const pandaBaseColors = {
  black: { value: "#222222" },
  white: { value: "#EEEEEE" },
  ...Object.entries(types).reduce(
    (acc, [key, l]) => {
      acc[key] = createOklch(l);
      return acc;
    },
    {} as Record<string, Record<number, { value: string }>>,
  ),
};
