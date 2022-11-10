export const currencyFormatter = (value?: number) => {
  return value
    ? Intl.NumberFormat("en", {
        notation: "compact",
        style: "currency",
        currency: "usd",
      }).format(value)
    : "";
};
