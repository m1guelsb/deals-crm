export function clearDealPrice(price: number) {
  return Number(price.toString().replace(/\D/g, ""));
}
