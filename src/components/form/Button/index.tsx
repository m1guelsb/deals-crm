import * as S from "./styles";
import type { ButtonProps } from "./types";

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
