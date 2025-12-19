import { describe, expect, it } from 'vitest'
import { formatCurrencyAmount } from './currency'

describe('formatCurrencyAmount', () => {
  it('formats with 2 decimals and code', () => {
    expect(formatCurrencyAmount({ amount: 0, currency: 'EUR' })).toBe('0.00 EUR')
  })

  it('rounds to 2 decimals', () => {
    expect(formatCurrencyAmount({ amount: 1.005, currency: 'EUR' })).toBe('1.01 EUR')
  })
})
