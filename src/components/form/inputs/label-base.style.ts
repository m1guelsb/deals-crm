import { css } from "@/stitches.config";

export const labelBaseStyled = css({
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
