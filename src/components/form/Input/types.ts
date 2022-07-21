import { InputHTMLAttributes, ReactNode } from "react";
import { CSS } from "@/styles/stitches.config";
import { InputVariants } from "./styles";

export type InputProps = {
  css?: CSS;
  label: string;
  icon?: ReactNode;
  errorMessage?: string;
} & InputVariants &
  InputHTMLAttributes<HTMLInputElement>;
