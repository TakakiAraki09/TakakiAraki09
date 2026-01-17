import type { GetPandaConfigMap } from "./interfaces";

export const pandaBaseColors: GetPandaConfigMap<"colors"> = {
  black: { value: "#000000" },
  white: { value: "#FFFFFF" },

  gray: {
    100: { value: "#F3F4F6" },
    400: { value: "#9CA3AF" },
    600: { value: "#4B5563" },
    900: { value: "#111827" },
  },

  blue: {
    100: { value: "#DBEAFE" },
    400: { value: "#60A5FA" },
    600: { value: "#2563EB" },
    900: { value: "#1E3A8A" },
  },

  green: {
    100: { value: "#D1FAE5" },
    400: { value: "#34D399" },
    600: { value: "#059669" },
    900: { value: "#064E3B" },
  },

  red: {
    100: { value: "#FEE2E2" },
    400: { value: "#F87171" },
    600: { value: "#DC2626" },
    900: { value: "#7F1D1D" },
  },

  yellow: {
    100: { value: "#FEF3C7" },
    400: { value: "#FBBF24" },
    600: { value: "#D97706" },
    900: { value: "#78350F" },
  },
};
