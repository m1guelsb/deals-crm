import { css } from "@/stitches.config";

export const inputBaseStyle = css({
  "color": "$text1",

  "width": "21rem",

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
  "&:focus": {
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
