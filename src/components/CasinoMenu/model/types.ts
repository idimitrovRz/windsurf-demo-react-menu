import type { CurrencyAmount, CurrencyCode } from '../../../shared/format/currency'

export type CasinoMenuTabId = 'game' | 'autoplay' | 'info' | 'history'

export type GameSettingsState = Readonly<{
  sound: boolean
  backgroundSound: boolean
  quickSpin: boolean
  batterySaver: boolean
}>

export type MoneyAmount = CurrencyAmount
export type CasinoCurrencyCode = CurrencyCode

export type AutoplayRulesState = Readonly<{
  stopOnBalanceDecrease: MoneyAmount
  stopOnSingleWin: MoneyAmount
  stopOnBalanceIncrease: MoneyAmount
}>

export type SymbolId = string

export type PayoutDefinition = Readonly<{
  count: 3 | 4 | 5
  payout: MoneyAmount
}>

export type InfoSymbol = Readonly<{
  id: SymbolId
  name: string
  iconUrl?: string
  payouts: ReadonlyArray<PayoutDefinition>
}>

export type InfoModel = Readonly<{
  symbols: ReadonlyArray<InfoSymbol>
}>

export type HistoryMode = 'current' | 'all'

export type HistoryEntry = Readonly<{
  id: string
  timestampMs: number
  title: string
  delta: MoneyAmount
}>

export type IsoDate = `${number}-${string}-${string}`

export type HistoryByDate = Readonly<Record<IsoDate, ReadonlyArray<HistoryEntry>>>

export type HistoryEntriesByMode = Readonly<{
  current: HistoryByDate
  all: HistoryByDate
}>

export type HistoryModel = Readonly<{
  entriesByDate: HistoryEntriesByMode
  mode?: HistoryMode
  selectedDate?: IsoDate
}>

export type CasinoMenuProps = Readonly<{
  isOpen: boolean
  onRequestClose: () => void
  initialTab?: CasinoMenuTabId
  settings: GameSettingsState
  onSettingsChange: (next: GameSettingsState) => void
  autoplayRules: AutoplayRulesState
  onAutoplayRulesChange: (next: AutoplayRulesState) => void
  historyModel?: HistoryModel
  onDateChange: (date: IsoDate) => void
  onHistoryModeChange?: (mode: HistoryMode) => void
  infoModel?: InfoModel
}>
