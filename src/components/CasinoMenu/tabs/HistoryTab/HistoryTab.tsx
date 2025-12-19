import styles from './HistoryTab.module.css'
import type { HistoryMode, HistoryModel, IsoDate } from '../../model/types'
import { Calendar } from '../../components/Calendar/Calendar'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl'
import { formatMoneyAmount } from '../../model/format'
import { EMPTY_HISTORY_BY_DATE, getEntriesForDate, todayIsoDate } from '../../model/history'

type HistoryTabProps = Readonly<{
  historyModel?: HistoryModel
  onDateChange: (date: IsoDate) => void
  onHistoryModeChange?: (mode: HistoryMode) => void
}>

const OPTIONS: ReadonlyArray<{ id: HistoryMode; label: string }> = [
  { id: 'current', label: 'Current Game' },
  { id: 'all', label: 'All Games' },
]

export function HistoryTab(props: HistoryTabProps) {
  const { historyModel, onDateChange, onHistoryModeChange } = props

  const selectedDate = historyModel?.selectedDate ?? todayIsoDate()
  const mode: HistoryMode = historyModel?.mode ?? 'current'
  const entriesByDate = historyModel?.entriesByDate?.[mode] ?? EMPTY_HISTORY_BY_DATE

  const entries = getEntriesForDate(entriesByDate, selectedDate)

  return (
    <div className={styles.root}>
      <Calendar selectedDate={selectedDate} onDateSelect={onDateChange} />

      <div className={styles.segmentWrapper}>
        <SegmentedControl
          activeId={mode}
          options={OPTIONS}
          ariaLabel="History mode"
          onChange={(next) => onHistoryModeChange?.(next)}
        />
      </div>

      <div className={styles.list} aria-label="History entries">
        {entries.length === 0 ? (
          <div className={styles.empty}>No history for this date</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={styles.item}>
              <div className={styles.itemTitle}>{entry.title}</div>
              <div className={styles.itemDelta}>{formatMoneyAmount(entry.delta)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
