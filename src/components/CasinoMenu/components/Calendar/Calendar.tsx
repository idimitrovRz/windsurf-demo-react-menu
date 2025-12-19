import { useMemo, useState } from 'react'
import styles from './Calendar.module.css'
import {
  CALENDAR_GRID_CELL_COUNT,
  CALENDAR_WEEK_STARTS_ON_MONDAY,
  addDays,
  getCalendarGridStart,
  getMonthLabel,
  toIsoDate,
} from '../../model/calendar'
import type { IsoDate } from '../../model/types'
import { KEYBOARD_KEYS } from '../../model/tokens'

type CalendarProps = Readonly<{
  selectedDate?: IsoDate
  onDateSelect: (date: IsoDate) => void
}>

type CalendarCell = Readonly<{
  date: Date
  iso: IsoDate
  inCurrentMonth: boolean
}>

const WEEKDAYS: ReadonlyArray<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function startMonthState(): { year: number; monthIndex: number } {
  const now = new Date()
  return { year: now.getFullYear(), monthIndex: now.getMonth() }
}

export function Calendar(props: CalendarProps) {
  const { selectedDate, onDateSelect } = props
  const [month, setMonth] = useState(startMonthState)

  const grid = useMemo(() => {
    const start = getCalendarGridStart(month, CALENDAR_WEEK_STARTS_ON_MONDAY)
    const cells: CalendarCell[] = []

    for (let i = 0; i < CALENDAR_GRID_CELL_COUNT; i += 1) {
      const date = addDays(start, i)
      const iso = toIsoDate(date)
      cells.push({
        date,
        iso,
        inCurrentMonth: date.getFullYear() === month.year && date.getMonth() === month.monthIndex,
      })
    }

    return cells
  }, [month])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEYS.ArrowRight) {
      event.preventDefault()
      setMonth((prev) => {
        const next = new Date(prev.year, prev.monthIndex + 1, 1)
        return { year: next.getFullYear(), monthIndex: next.getMonth() }
      })
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft) {
      event.preventDefault()
      setMonth((prev) => {
        const next = new Date(prev.year, prev.monthIndex - 1, 1)
        return { year: next.getFullYear(), monthIndex: next.getMonth() }
      })
    }
  }

  return (
    <div className={styles.root} onKeyDown={onKeyDown}>
      <div className={styles.header}>
        <div className={styles.monthLabel}>{getMonthLabel(month)}</div>
        <div className={styles.hint}>Use Left/Right to change month</div>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.grid} role="grid" aria-label="History calendar">
        {grid.map((cell) => {
          const isSelected = selectedDate === cell.iso
          const className = isSelected
            ? styles.daySelected
            : cell.inCurrentMonth
              ? styles.day
              : styles.dayMuted

          return (
            <button
              key={cell.iso}
              type="button"
              className={className}
              onClick={() => onDateSelect(cell.iso)}
              aria-pressed={isSelected}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
