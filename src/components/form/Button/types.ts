import { CSS } from "@/styles/stitches.config";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonVariants } from "./styles";

export type ButtonProps = {
  css?: CSS;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
} & ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement>;
