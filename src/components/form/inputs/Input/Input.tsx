/* eslint-disable react/display-name */
import { ComponentProps, forwardRef } from "react";
import { styled } from "@/stitches.config";
import { ErrorMessage } from "@/components/feedback/ErrorMessage/ErrorMessage";
import { inputBaseStyle } from "@/components/form/inputs/input-base.style";
import { labelBaseStyled } from "@/components/form/inputs/label-base.style";

interface InputProps extends ComponentProps<typeof InputElement> {
  label: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, sSize, ...props }, ref) => {
    return (
      <Container>
        <Label sSize={sSize} htmlFor={label}>
          {label}
        </Label>
        <InputWrapper>
          <InputElement
            id={label}
            sSize={sSize}
            type="text"
            ref={ref}
            {...props}
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </InputWrapper>
      </Container>
    );
  }
);

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});
const InputWrapper = styled("span", {
  display: "flex",
  flexDirection: "column",
});
const InputElement = styled("input", inputBaseStyle, {});
const Label = styled("label", labelBaseStyled, {});
