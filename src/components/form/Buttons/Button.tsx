import { ComponentProps } from "react";
import { Icon } from "@/components/media/Icon";
import { styled } from "@/stitches.config";
import { buttonBaseStyle } from "./button-base.styled";

interface ButtonProps extends ComponentProps<typeof ButtonElement> {
  leftIcon?: string;
  rightIcon?: string;
}
export const Button = ({
  leftIcon,
  rightIcon,
  children,
  sSize,
  ...props
}: ButtonProps) => {
  return (
    <ButtonElement sSize={sSize} {...props}>
      {leftIcon && <Icon src={leftIcon} sSize={sSize} />}

      {children}

      {rightIcon && <Icon src={rightIcon} sSize={sSize} />}
    </ButtonElement>
  );
};

const ButtonElement = styled("button", buttonBaseStyle, {
  variants: {
    sSize: {
      small: {
        height: "2.5rem",
        gap: "0.25rem",
        padding: "1.25rem",
        fontSize: "$sm",
      },
      medium: {
        height: "3rem",
        gap: "0.5rem",
        padding: "1.5rem",
        fontSize: "$md",
      },
      large: {
        height: "4rem",
        gap: "0.75rem",
        padding: "1.75rem",
        fontSize: "$lg",
      },
    },

    sRadius: {
      small: {
        borderRadius: "$sm",
      },
      medium: {
        borderRadius: "$md",
      },
      large: {
        borderRadius: "$lg",
      },
    },
  },

  defaultVariants: {
    sSize: "medium",
    sRadius: "medium",
  },
});
