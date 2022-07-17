import { styled } from "@/stitches.config";

export const Heading = styled("h1", {
  variants: {
    sType: {
      1: {
        fontSize: "$4xl",
      },
      2: {
        fontSize: "$3xl",
      },
      3: {
        fontSize: "$2xl",
      },
    },
  },
  defaultVariants: {
    sType: "1",
  },
});
