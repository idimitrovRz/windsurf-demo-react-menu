export type CurrencyCode = 'EUR'

export type CurrencyAmount = Readonly<{
  amount: number
  currency: CurrencyCode
}>

function roundTo2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function formatCurrencyAmount(value: CurrencyAmount): string {
  const rounded = roundTo2(value.amount)
  return `${rounded.toFixed(2)} ${value.currency}`
}
