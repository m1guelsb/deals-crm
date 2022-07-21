import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import { styled } from "@/styles/stitches.config";

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
  "& svg": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "variants": {
    sType: {
      primary: {
        iconColor: "$text1",
      },
    },
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
  },

  "defaultVariants": {
    sSize: "medium",
    sType: "primary",
  },
});
