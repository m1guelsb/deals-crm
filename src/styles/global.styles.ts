import { globalCss, theme } from "./stitches.config";

export const stitchesGlobalStyles = globalCss({
  ":root": {
    fontSize: "16px",

    "@breakpoint1": {
      //1024px
      fontSize: "14px",
    },
  },
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },

  "@font-face": [
    {
      fontFamily: "Poppins",
      src: "url('/fonts/Poppins-Regular.ttf')",
      fontWeight: "400",
      fontDisplay: "optional",
      fontStyle: "normal",
    },
    {
      fontFamily: "Poppins",
      src: "url('/fonts/Poppins-Medium.ttf')",
      fontWeight: "500",
      fontDisplay: "optional",
      fontStyle: "normal",
    },
    {
      fontFamily: "Poppins",
      src: "url('/fonts/Poppins-Bold.ttf')",
      fontWeight: "700",
      fontDisplay: "optional",
      fontStyle: "normal",
    },
  ],

  "html, body, #__next": {
    height: "100%",
  },

  "*::-webkit-scrollbar": {
    width: "0.75rem",
    height: "0.75rem",
  },
  "*::-webkit-scrollbar-track": {
    backgroundColor: theme.colors.background3,
    borderRadius: theme.radii.md,
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.md,

    border: "none",
    outline: "none",

    "&:hover": {
      filter: "brightness(1.5)",
    },
    "&:active": {
      backgroundColor: theme.colors.primary,
    },
  },

  body: {
    fontFamily: theme.fonts.Poppins,

    backgroundColor: theme.colors.background1,
    color: theme.colors.text1,
  },
});
