import { keyframes, styled, theme } from "@/styles/stitches.config";
const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const Spinner = styled("div", {
  borderStyle: "solid",
  borderWidth: "0.2rem",

  borderBottomColor: theme.colors.background3,
  borderLeftColor: theme.colors.background3,
  borderRadius: "99999px",

  animation: `0.45s linear 0s infinite normal none ${spin}`,

  variants: {
    sType: {
      primary: {
        borderTopColor: theme.colors.primary,
        borderRightColor: theme.colors.primary,
      },
      secondary: {
        borderTopColor: theme.colors.text1,
        borderRightColor: theme.colors.text1,
      },
    },
    sSize: {
      medium: {
        width: "1.5rem",
        height: "1.5rem",
      },
    },
  },

  defaultVariants: {
    sType: "primary",
    sSize: "medium",
  },
});
