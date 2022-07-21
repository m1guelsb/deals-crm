import * as Stitches from "@stitches/react";
import { defaultTheme } from "./theme.styles";
import { styleUtils } from "./utils.styles";

export type CSS = Stitches.CSS<typeof config>;
export type VariantProps<T> = Stitches.VariantProps<T>;

const stitches = Stitches.createStitches({
  theme: defaultTheme,

  media: {
    breakpoint1: "(max-width: 1380px)",
    breakpoint2: "(max-width: 768px)",
    breakpoint3: "(max-width: 640px)",
  },

  utils: styleUtils,
});

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = stitches;
