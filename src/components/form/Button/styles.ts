import { styled, VariantProps } from "@/styles/stitches.config";

export type ButtonVariants = VariantProps<typeof Button>;

export const Button = styled("button", {
  "width": "fit-content",

  "color": "$text1",

  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",

  "&:hover": {
    filter: "brightness(1.3)",
  },

  "border": "none",

  "cursor": "pointer",
  "userSelect": "none",

  "transition": "ease .15s",

  "&[disabled]": {
    filter: "brightness(0.7)",
    pointerEvents: "none",
  },

  "variants": {
    sType: {
      primary: {
        "backgroundColor": "$primary",

        "&:active": {
          backgroundColor: "$primary",
        },
      },

      secondary: {
        "backgroundColor": "$background3",

        "&:active": {
          backgroundColor: "$background3",
        },
      },

      tertiary: {
        "backgroundColor": "$background3",
        "color": "$error",

        "&:active": {
          backgroundColor: "$background3",
        },
      },
    },
    sSize: {
      small: {
        height: "2.5rem",
        gap: "0.25rem",
        padding: "1.25rem",
        fontSize: "$sm",
      },
      medium: {
        height: "3rem",
        gap: "0.5rem",
        padding: "1.5rem",
        fontSize: "$md",
      },
      large: {
        height: "4rem",
        gap: "0.75rem",
        padding: "1.75rem",
        fontSize: "$lg",
      },
    },

    sRadius: {
      small: {
        borderRadius: "$sm",
      },
      medium: {
        borderRadius: "$md",
      },
      large: {
        borderRadius: "$lg",
      },
    },
  },

  "defaultVariants": {
    sType: "primary",
    sSize: "medium",
    sRadius: "medium",
  },
});
