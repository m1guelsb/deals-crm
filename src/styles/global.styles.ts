import { globalCss, theme } from "./stitches.config";

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

    fontFamily: theme.fonts.Poppins,
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
    fontFamily: theme.fonts.Poppins,

    overflow: "hidden",

    backgroundColor: theme.colors.background1,
    color: theme.colors.text1,
  },
});
