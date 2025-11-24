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
        _light: "{colors.gray.100}",
        _dark: "{colors.gray.900}"
      }
    },
    info: {
      value: {
        _light: "{colors.blue.100}",
        _dark: "{colors.blue.900}"
      }
    },
    sccess: {
      value: {
        _light: "{colors.green.100}",
        _dark: "{colors.green.900}"
      }
    },
    error: {
      value: {
        _light: "{colors.red.100}",
        _dark: "{colors.red.900}"
      }
    },
    warn: {
      value: {
        _light: "{colors.yellow.100}",
        _dark: "{colors.yellow.900}"
      }
    },
    disabled: {
      value: {
        _light: "{colors.gray.100}",
        _dark: "{colors.gray.900}"
      }
    },
  },
  contents: {
    primary: {
      value: {
        _light: "{colors.gray.900}",
        _dark: "{colors.gray.100}"
      }
    },
    info: {
      value: {
        _light: "{colors.blue.900}",
        _dark: "{colors.blue.100}"
      }
    },
    sccess: {
      value: {
        _light: "{colors.green.900}",
        _dark: "{colors.green.100}"
      }
    },
    error: {
      value: {
        _light: "{colors.red.900}",
        _dark: "{colors.red.100}"
      }
    },
    warn: {
      value: {
        _light: "{colors.yellow.900}",
        _dark: "{colors.yellow.100}"
      }
    },
    disabled: {
      value: {
        _light: "{colors.gray.900}",
        _dark: "{colors.gray.100}"
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
    sccess: {
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
