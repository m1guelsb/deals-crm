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
      small: {
        height: "2.5rem",
        gap: "0.25rem",
        _paddingX: "1.25rem",
        fontSize: theme.fontSizes.sm,
      },
      medium: {
        height: "3rem",
        gap: "0.5rem",
        _paddingX: "1.5rem",
        fontSize: theme.fontSizes.md,
      },
      large: {
        height: "4rem",
        gap: "0.75rem",
        _paddingX: "1.75rem",
        fontSize: theme.fontSizes.lg,
      },
    },

    sRadius: {
      small: {
        borderRadius: theme.radii.sm,
      },
      medium: {
        borderRadius: theme.radii.md,
      },
      large: {
        borderRadius: theme.radii.lg,
      },
    },
  },

  "defaultVariants": {
    sType: "primary",
    sSize: "medium",
    sRadius: "medium",
  },
});
