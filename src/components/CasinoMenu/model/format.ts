import { formatCurrencyAmount } from '../../../shared/format/currency'
import type { MoneyAmount } from './types'

export function formatMoneyAmount(value: MoneyAmount): string {
  return formatCurrencyAmount(value)
}

export function withAmount(value: MoneyAmount, amount: number): MoneyAmount {
  return { ...value, amount }
}
