import { styled, theme, VariantProps } from "@/styles/stitches.config";

export type InputVariants = VariantProps<typeof InputWrapper>;

export const Wrapper = styled("div", {
  _flexColumn: true,
  gap: "0.25rem",
});
export const InputWrapper = styled("span", {
  "width": "23rem",
  "color": theme.colors.text1,

  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",

  "borderWidth": "0.1rem",
  "borderColor": "$background1",
  "borderStyle": "solid",

  "userSelect": "none",

  "transition": "ease .1s",

  "&[disabled]": {
    filter: "brightness(0.7)",
    pointerEvents: "none",
  },
  "&:focus-within": {
    outlineColor: theme.colors.primary,
    outlineStyle: "solid",
    outlineWidth: "0.2rem",
  },

  "variants": {
    sType: {
      primary: {
        backgroundColor: theme.colors.background3,
      },
    },

    sSize: {
      medium: {
        "height": "3rem",
        "_paddingX": "1rem",
        "gap": "0.5rem",
        "& input": {
          fontSize: theme.fontSizes.md,
        },
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
export const Input = styled("input", {
  height: "100%",
  width: "100%",

  background: "transparent",
  opacity: "0.8",
  color: theme.colors.text1,

  border: 0,
  outline: 0,
});

export const Label = styled("label", {
  color: theme.colors.text1,

  variants: {
    sSize: {
      medium: {
        fontSize: theme.fontSizes.md,
      },
    },
  },
});

export const Icon = styled("span", {});

export const ErrorMessage = styled("span", {
  height: "1rem",
  display: "flex",
  alignItems: "start",

  color: theme.colors.error,

  fontSize: theme.fontSizes.xs,
  _truncate: true,
});
