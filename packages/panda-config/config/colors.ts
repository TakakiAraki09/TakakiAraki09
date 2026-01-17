import type { GetPandaSematicToken } from "./interfaces";

export const pandaSemanticColors: GetPandaSematicToken<"colors"> = {
  bg: {
    primary: {
      value: {
        _light: "{colors.white}",
        _dark: "{colors.black}"
      }
    },
    secondary: {
      value: {
        _light: "{colors.gray.200}",
        _dark: "{colors.gray.800}"
      }
    },
    info: {
      value: {
        _light: "{colors.blue.200}",
        _dark: "{colors.blue.800}"
      }
    },
    success: {
      value: {
        _light: "{colors.green.200}",
        _dark: "{colors.green.800}"
      }
    },
    error: {
      value: {
        _light: "{colors.red.200}",
        _dark: "{colors.red.800}"
      }
    },
    warn: {
      value: {
        _light: "{colors.yellow.200}",
        _dark: "{colors.yellow.800}"
      }
    },
    disabled: {
      value: {
        _light: "{colors.gray.200}",
        _dark: "{colors.gray.800}"
      }
    },
  },
  contents: {
    primary: {
      value: {
        _light: "{colors.gray.800}",
        _dark: "{colors.gray.200}"
      }
    },
    info: {
      value: {
        _light: "{colors.blue.800}",
        _dark: "{colors.blue.200}"
      }
    },
    success: {
      value: {
        _light: "{colors.green.800}",
        _dark: "{colors.green.200}"
      }
    },
    error: {
      value: {
        _light: "{colors.red.800}",
        _dark: "{colors.red.200}"
      }
    },
    warn: {
      value: {
        _light: "{colors.yellow.800}",
        _dark: "{colors.yellow.200}"
      }
    },
    disabled: {
      value: {
        _light: "{colors.gray.800}",
        _dark: "{colors.gray.200}"
      }
    },
  },
  accent: {
    primary: {
      value: {
        _light: "{colors.gray.600}",
        _dark: "{colors.gray.400}"
      }
    },
    info: {
      value: {
        _light: "{colors.blue.600}",
        _dark: "{colors.blue.400}"
      }
    },
    success: {
      value: {
        _light: "{colors.green.600}",
        _dark: "{colors.green.400}"
      }
    },
    error: {
      value: {
        _light: "{colors.red.600}",
        _dark: "{colors.red.400}"
      }
    },
    warn: {
      value: {
        _light: "{colors.yellow.600}",
        _dark: "{colors.yellow.400}"
      }
    },
    disabled: {
      value: {
        _light: "{colors.gray.400}",
        _dark: "{colors.gray.600}"
      }
    },
  }
};
