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
      primary: "#CABDFF",
      secondary: "#FF6A55",

      background1: "#111315",
      background2: "#1A1D1F",
      background3: "#2B3034",

      text1: "#EFEFEF",
      text2: "#9A9FA5",
      text3: "#5B6268",

      success: "#2B9941",
      successLight: "#A4F1BF",

      warning: "#FB8E40",
      warningLight: "#ffdfa1",

      error: "#F04545",
      errorLight: "#ffc3c3",

      info: "#1156bd",
      infoLight: "#d5e5ff",
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
      "heading-1": "2rem",
      "heading-2": "1.5rem",

      "text-xl": "1.5rem",
      "text-lg": "1.25rem",
      "text-md": "1rem",
      "text-sm": "0.875rem",
      "text-xs": "0.75rem",
    },

    borderWidths: {
      sm: "0.063rem",
      md: "0.094rem",
      lg: "0.125rem",
    },

    radii: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.625rem",
      rounded: "9999px",
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
  },
});

export const stitchesGlobalStyles = globalCss({
  ":root": {
    "fontSize": "16px",

    "@breakpoint1": {
      //1024px
      fontSize: "12px",
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
