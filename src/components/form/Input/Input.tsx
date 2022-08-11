/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { InputHTMLAttributes, ReactNode } from "react";
import { CSS } from "@/styles/stitches.config";
import { InputVariants } from "./input.styles";
import * as S from "./input.styles";

export type InputProps = {
  css?: CSS;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
} & InputVariants &
  InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      leftIcon,
      rightIcon,
      sSize,
      sRadius,
      sType,
      css,
      ...props
    },
    ref
  ) => {
    const styleProps = { sSize, sRadius, sType };

    return (
      <S.Wrapper css={css}>
        {label && (
          <S.Label sSize={sSize} htmlFor={label}>
            {label}
          </S.Label>
        )}
        <S.InputWrapper {...styleProps} css={css}>
          {leftIcon && <S.Icon>{leftIcon}</S.Icon>}
          <S.Input id={label} type="text" ref={ref} {...props} />
          {rightIcon && <S.Icon>{rightIcon}</S.Icon>}
        </S.InputWrapper>
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </S.Wrapper>
    );
  }
);
