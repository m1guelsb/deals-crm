import { styled, theme, VariantProps } from "@/styles/stitches.config";

export type ButtonVariants = VariantProps<typeof Button>;

export const Button = styled("button", {
  "width": "fit-content",

  "color": theme.colors.text1,

  "_alignCenter": true,

  "border": "none",

  "cursor": "pointer",
  "userSelect": "none",

  "transition": "ease .15s",

  "&:hover": {
    filter: "brightness(1.3)",
  },
  "&:active": {
    filter: "brightness(1)",
  },

  "&[disabled]": {
    filter: "brightness(0.5)",
    pointerEvents: "none",
  },

  "variants": {
    sType: {
      primary: {
        backgroundColor: theme.colors.primary,
      },

      secondary: {
        backgroundColor: theme.colors.background3,
      },

      tertiary: {
        backgroundColor: theme.colors.background3,
        color: theme.colors.error,
      },
    },
    sSize: {
      medium: {
        height: "3rem",
        gap: "0.5rem",
        _paddingX: "1.5rem",
        fontSize: theme.fontSizes.md,
      },
    },

    sRadius: {
      medium: {
        borderRadius: theme.radii.md,
      },
    },
  },

  "defaultVariants": {
    sType: "primary",
    sSize: "medium",
    sRadius: "medium",
  },
});

export const IconWrapper = styled("span", {
  minWidth: "1.5rem",
  maxWidth: "fit-content",
});
