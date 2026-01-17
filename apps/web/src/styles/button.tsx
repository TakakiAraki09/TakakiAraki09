import { cva } from "~/styled-system/css";

export const buttonStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "body",
    borderRadius: "inner",
    cursor: "pointer",
    fontWeight: "medium",
    transition: "all 0.2s",
    border: "none",
    outline: "none",
    userSelect: "none",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      primary: {
        color: "accent.primary",
        bg: "bg.primary",
        border: "1px solid",
        borderColor: "accent.primary",
        _hover: {
          bg: "bg.secondary",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        _active: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
        },
      },
      info: {
        color: "contents.info",
        bg: "bg.info",
        _hover: {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
        },
      },
      success: {
        color: "contents.success",
        bg: "bg.success",
        _hover: {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
        },
      },
      error: {
        color: "contents.error",
        bg: "bg.error",
        _hover: {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.3)",
        },
      },
      warning: {
        color: "contents.warn",
        bg: "bg.warn",
        _hover: {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        _active: {
          transform: "translateY(0)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(234, 179, 8, 0.3)",
        },
      },
      ghost: {
        color: "accent.primary",
        bg: "transparent",
        _hover: {
          bg: "bg.secondary",
        },
        _active: {
          bg: "bg.secondary",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
        },
      },
      outline: {
        color: "accent.primary",
        bg: "transparent",
        border: "1px solid",
        borderColor: "accent.primary",
        _hover: {
          bg: "bg.secondary",
        },
        _active: {
          bg: "bg.secondary",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(128, 128, 128, 0.2)",
        },
      },
    },
    size: {
      small: {
        paddingY: "2",
        paddingX: "5",
        fontSize: "sm",
      },
      medium: {
        paddingX: "7",
        paddingY: "3",
        fontSize: "body",
      },
      large: {
        paddingX: "10",
        paddingY: "5",
        fontSize: "lg",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
