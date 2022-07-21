import { styled, VariantProps } from "@/styles/stitches.config";

export type InputVariants = VariantProps<typeof InputWrapper>;

export const Wrapper = styled("div", {
  _flexColumn: true,
  width: "100%",
  gap: "0.25rem",
});
export const InputWrapper = styled("span", {
  "color": "$text1",

  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",

  "border": "none",

  "userSelect": "none",

  "transition": "ease .1s",

  "&[disabled]": {
    filter: "brightness(0.7)",
    pointerEvents: "none",
  },
  "&:focus-within": {
    outlineColor: "$primary",
    outlineStyle: "solid",
    outlineWidth: "0.2rem",
  },

  "variants": {
    sType: {
      primary: {
        "backgroundColor": "$background3",

        "&:hover": {
          filter: "brightness(1.1)",
        },
      },
    },

    sSize: {
      small: {
        height: "2.5rem",
        paddingX: "1.25rem",
        fontSize: "$sm",
      },

      medium: {
        height: "3rem",
        paddingX: "1.5rem",
        fontSize: "$md",
      },

      large: {
        height: "4rem",
        paddingX: "1.5rem",
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
export const Input = styled("input", {
  height: "100%",
  width: "100%",

  background: "transparent",
  opacity: "0.8",
  color: "$text1",

  border: 0,
  outline: 0,
});
export const Label = styled("label", {
  color: "$text1",

  variants: {
    sSize: {
      small: {
        fontSize: "$sm",
      },
      medium: {
        fontSize: "$md",
      },
      large: {
        fontSize: "$lg",
      },
    },
  },
});
