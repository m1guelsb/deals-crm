import { CSS } from "@/styles/stitches.config";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonVariants } from "./button.styles";
import * as S from "./button.styles";

export type ButtonProps = {
  css?: CSS;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
} & ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  leftIcon,
  rightIcon,
  children,
  sSize,
  ...props
}: ButtonProps) => {
  return (
    <S.Button sSize={sSize} {...props}>
      {leftIcon}

      {children && <span>{children}</span>}

      {rightIcon}
    </S.Button>
  );
};
