/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { ErrorMessage } from "@/components/feedback/ErrorMessage/ErrorMessage";

import * as S from "./styles";
import { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, sSize, icon, ...props }, ref) => {
    return (
      <S.Wrapper>
        <S.Label sSize={sSize} htmlFor={label}>
          {label}
        </S.Label>
        <S.InputWrapper sSize={sSize} {...props}>
          {icon}
          <S.Input id={label} type="text" ref={ref} {...props} />
        </S.InputWrapper>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </S.Wrapper>
    );
  }
);
