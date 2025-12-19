import type { HistoryByDate, HistoryEntry, HistoryMode, IsoDate } from './types'
import { fromIsoDate, toIsoDate } from './calendar'

export const EMPTY_HISTORY_BY_DATE: HistoryByDate = {}

export function getEntriesForDate(entriesByDate: HistoryByDate, date: IsoDate): ReadonlyArray<HistoryEntry> {
  return entriesByDate[date] ?? []
}

export function getModeLabel(mode: HistoryMode): string {
  return mode === 'current' ? 'Current Game' : 'All Games'
}

export function todayIsoDate(): IsoDate {
  return toIsoDate(new Date())
}

export function isSameMonth(iso: IsoDate, year: number, monthIndex: number): boolean {
  const date = fromIsoDate(iso)
  return date.getFullYear() === year && date.getMonth() === monthIndex
}
