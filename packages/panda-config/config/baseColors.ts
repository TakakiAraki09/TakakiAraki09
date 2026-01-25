import type { GetPandaConfigMap } from "./interfaces";

const createOklch = (l: number) => {
  return {
    100: { value: `oklch(94% 0.02 ${l})` }, // 背景用：超低彩度
    200: { value: `oklch(89% 0.03 ${l})` }, // 背景用：低彩度
    300: { value: `oklch(83% 0.04 ${l})` }, // 背景用：やや低彩度
    400: { value: `oklch(74% 0.06 ${l})` }, // 中間：ほどほど彩度
    500: { value: `oklch(63% 0.08 ${l})` }, // 中間：やや高め彩度
    600: { value: `oklch(52% 0.10 ${l})` }, // アクセント：高め彩度
    700: { value: `oklch(42% 0.10 ${l})` }, // アクセント：高め彩度
    800: { value: `oklch(32% 0.08 ${l})` }, // 暗い背景：やや高め彩度
    900: { value: `oklch(24% 0.06 ${l})` }, // 暗い背景：ほどほど彩度
  };
};
const types = {
  gray: 250,
  orange: 40,
  purple: 290,
  teal: 180,
  blue: 240,
  green: 145,
  red: 10,
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
