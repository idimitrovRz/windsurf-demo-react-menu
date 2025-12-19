import type { IsoDate } from './types'

export type CalendarMonth = Readonly<{
  year: number
  monthIndex: number
}>

export const CALENDAR_GRID_CELL_COUNT = 42
export const CALENDAR_WEEK_DAY_COUNT = 7
export const CALENDAR_WEEK_STARTS_ON_MONDAY = 1 as const

export function toIsoDate(date: Date): IsoDate {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromIsoDate(iso: IsoDate): Date {
  const [y, m, d] = iso.split('-').map((part) => Number(part))
  return new Date(y, m - 1, d)
}

export function startOfMonth(month: CalendarMonth): Date {
  return new Date(month.year, month.monthIndex, 1)
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(date.getDate() + days)
  return next
}

export function daysInMonth(month: CalendarMonth): number {
  return new Date(month.year, month.monthIndex + 1, 0).getDate()
}

export function getMonthLabel(month: CalendarMonth): string {
  const date = new Date(month.year, month.monthIndex, 1)
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

export function getCalendarGridStart(month: CalendarMonth, weekStartsOn: 0 | 1 = 1): Date {
  const first = startOfMonth(month)
  const day = first.getDay()
  const offset = (day - weekStartsOn + 7) % 7
  return addDays(first, -offset)
}
