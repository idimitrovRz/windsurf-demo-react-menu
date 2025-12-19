import type { InfoModel, MoneyAmount } from './types'

export type SliderConfig = Readonly<{
  id: 'stopOnBalanceDecrease' | 'stopOnSingleWin' | 'stopOnBalanceIncrease'
  label: string
  min: MoneyAmount
  max: MoneyAmount
  dragStep: number
  keyboardStep: number
  keyboardStepLarge: number
}>

export const DEFAULT_CURRENCY = 'EUR' as const

export const AUTOPLAY_SLIDERS: ReadonlyArray<SliderConfig> = [
  {
    id: 'stopOnBalanceDecrease',
    label: 'If balance decreases by',
    min: { amount: 0, currency: DEFAULT_CURRENCY },
    max: { amount: 800, currency: DEFAULT_CURRENCY },
    dragStep: 0.01,
    keyboardStep: 0.1,
    keyboardStepLarge: 1,
  },
  {
    id: 'stopOnSingleWin',
    label: 'If single win exceeds',
    min: { amount: 0, currency: DEFAULT_CURRENCY },
    max: { amount: 20, currency: DEFAULT_CURRENCY },
    dragStep: 0.01,
    keyboardStep: 0.01,
    keyboardStepLarge: 0.1,
  },
  {
    id: 'stopOnBalanceIncrease',
    label: 'If balance increases by',
    min: { amount: 0, currency: DEFAULT_CURRENCY },
    max: { amount: 2000, currency: DEFAULT_CURRENCY },
    dragStep: 0.01,
    keyboardStep: 0.1,
    keyboardStepLarge: 1,
  },
]

export const DEFAULT_INFO_MODEL: InfoModel = {
  symbols: [
    {
      id: 'cherry',
      name: 'Cherry',
      payouts: [
        { count: 3, payout: { amount: 1, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 3, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 10, currency: DEFAULT_CURRENCY } },
      ],
    },
    {
      id: 'lemon',
      name: 'Lemon',
      payouts: [
        { count: 3, payout: { amount: 0.5, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 2, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 6, currency: DEFAULT_CURRENCY } },
      ],
    },
    {
      id: 'seven',
      name: 'Seven',
      payouts: [
        { count: 3, payout: { amount: 5, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 20, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 80, currency: DEFAULT_CURRENCY } },
      ],
    },
    {
      id: 'bar',
      name: 'BAR',
      payouts: [
        { count: 3, payout: { amount: 2, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 8, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 25, currency: DEFAULT_CURRENCY } },
      ],
    },
    {
      id: 'bell',
      name: 'Bell',
      payouts: [
        { count: 3, payout: { amount: 1.5, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 5, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 15, currency: DEFAULT_CURRENCY } },
      ],
    },
    {
      id: 'diamond',
      name: 'Diamond',
      payouts: [
        { count: 3, payout: { amount: 3, currency: DEFAULT_CURRENCY } },
        { count: 4, payout: { amount: 12, currency: DEFAULT_CURRENCY } },
        { count: 5, payout: { amount: 40, currency: DEFAULT_CURRENCY } },
      ],
    },
  ],
}
