import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import { styled } from "@/stitches.config";

interface IconProps extends ComponentProps<typeof IconContainer> {
  src: string;
}
export const Icon = ({ src, ...props }: IconProps) => {
  return (
    <IconContainer {...props}>
      <ReactSVG src={src} wrapper={"span"} />
    </IconContainer>
  );
};

const IconContainer = styled("span", {
  "color": "red",

  "& svg": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "variants": {
    sSize: {
      small: {
        "& svg": { height: "1rem", width: "1rem" },
      },
      medium: {
        "& svg": { height: "1.5rem", width: "1.5rem" },
      },
      large: {
        "& svg": { height: "2rem", width: "2rem" },
      },
    },
    sType: {
      primary: {
        "& svg": {
          "& path": {
            stroke: "$text1",
          },
          "& circle": {
            stroke: "$text1",
          },
        },
      },

      error: {
        "& svg": {
          "& path": {
            stroke: "$error",
          },
          "& circle": {
            stroke: "$error",
          },
        },
      },
    },
  },

  "defaultVariants": {
    sSize: "medium",
    sType: "primary",
  },
});
