export function formatPrice(amount: number, currency: string = "EUR") {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
  }).format(amount);
}
