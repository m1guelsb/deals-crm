import { styled, theme } from "@/styles/stitches.config";

export const Heading = styled("h1", {
  variants: {
    sType: {
      1: {
        fontSize: theme.fontSizes["4xl"],
      },
      2: {
        fontSize: theme.fontSizes["3xl"],
      },
      3: {
        fontSize: theme.fontSizes["2xl"],
      },
    },
  },
  defaultVariants: {
    sType: "1",
  },
});
