import { ChangeEvent } from "react";

export const currencyMask = (value: string) => {
  const maskedValue = value
    .replace(/\D/g, "")
    .replace(/^/, "$")
    .replace(/(\d)(\d{2})$/, "$1.$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ",");
  return maskedValue;
};
