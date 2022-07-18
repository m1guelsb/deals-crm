import { css } from "@/stitches.config";

export const buttonBaseStyle = css({
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
  },

  "defaultVariants": {
    sType: "primary",
  },
});
