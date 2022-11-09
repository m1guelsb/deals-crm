export const phoneMask = (value: string) => {
  const maskedValue = value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
  // .replace(/-(\d{3})$/, "-$1-")
  // .replace(/-(\d{4})$/, "-$1");

  return maskedValue;
};
