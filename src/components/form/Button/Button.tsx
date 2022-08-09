/* eslint-disable react/display-name */
import { CSS } from "@/styles/stitches.config";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { ButtonVariants } from "./button.styles";
import * as S from "./button.styles";

export type ButtonProps = {
  css?: CSS;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
} & ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ leftIcon, rightIcon, children, sSize, ...props }, ref) => {
    return (
      <S.Button ref={ref} sSize={sSize} {...props}>
        {leftIcon && <S.IconWrapper>{leftIcon}</S.IconWrapper>}

        {children && <span>{children}</span>}

        {rightIcon && <S.IconWrapper>{rightIcon}</S.IconWrapper>}
      </S.Button>
    );
  }
);
