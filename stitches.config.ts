import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#7221de",
      secondary: "#FF6A55",

      background1: "#111315",
      background2: "#1A1D1F",
      background3: "#2B3034",

      text1: "#EFEFEF",
      text2: "#9A9FA5",
      text3: "#5B6268",

      success: "#66b576",
      error: "#f34a5e",
      info: "#2866c3",
    },

    fonts: {
      Poppins: "Poppins",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
    fontSizes: {
      "4xl": "4rem",
      "3xl": "3rem",
      "2xl": "2rem",
      "xl": "1.5rem",
      "lg": "1.25rem",
      "md": "1rem",
      "sm": "0.875rem",
      "xs": "0.75rem",
    },

    radii: {
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
    },
  },

  media: {
    breakpoint1: "(max-width: 1380px)",
    breakpoint2: "(max-width: 768px)",
    breakpoint3: "(max-width: 640px)",
  },

  utils: {
    paddingX: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    iconColor: (value: string) => ({
      "& svg": {
        "& path": {
          fill: value,
        },
      },
    }),
  },
});

export const stitchesGlobalStyles = globalCss({
  ":root": {
    "fontSize": "16px",

    "@breakpoint1": {
      //1024px
      fontSize: "14px",
    },
  },
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",

    fontFamily: "$Poppins, sans-serif",
  },

  "html, body, #__next": {
    height: "100%",
  },

  // "*::-webkit-scrollbar": {
  //   width: "0.5rem",
  // },
  // "*::-webkit-scrollbar-track": {
  //   backgroundColor: "transparent",
  // },
  // "*::-webkit-scrollbar-thumb": {
  //   "backgroundColor": "",

  //   "border": "none",
  //   "outline": "none",

  //   "&:hover": {
  //     backgroundColor: "",
  //   },
  //   "&:active": {
  //     backgroundColor: "",
  //   },
  // },

  "body": {
    fontFamily: "$Poppins, sans-serif",

    overflow: "hidden",

    backgroundColor: "$background1",
    color: "$text1",
  },
});
