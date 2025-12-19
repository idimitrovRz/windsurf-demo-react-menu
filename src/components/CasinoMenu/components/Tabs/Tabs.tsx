import { useId, useMemo } from 'react'
import styles from './Tabs.module.css'
import { KEYBOARD_KEYS } from '../../model/tokens'

export type TabItem<TTabId extends string> = Readonly<{
  id: TTabId
  label: string
  panel: React.ReactNode
}>

type TabsProps<TTabId extends string> = Readonly<{
  items: ReadonlyArray<TabItem<TTabId>>
  activeTabId: TTabId
  onTabChange: (next: TTabId) => void
}>

function getNextIndex(current: number, delta: number, total: number): number {
  const next = current + delta
  if (next < 0) {
    return total - 1
  }

  if (next >= total) {
    return 0
  }

  return next
}

export function Tabs<TTabId extends string>(props: TabsProps<TTabId>) {
  const { items, activeTabId, onTabChange } = props
  const baseId = useId()

  const activeIndex = useMemo(
    () => Math.max(0, items.findIndex((item) => item.id === activeTabId)),
    [activeTabId, items],
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const total = items.length
    if (total === 0) {
      return
    }

    if (event.key === KEYBOARD_KEYS.ArrowRight) {
      event.preventDefault()
      onTabChange(items[getNextIndex(activeIndex, 1, total)].id)
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft) {
      event.preventDefault()
      onTabChange(items[getNextIndex(activeIndex, -1, total)].id)
    }

    if (event.key === KEYBOARD_KEYS.Home) {
      event.preventDefault()
      onTabChange(items[0].id)
    }

    if (event.key === KEYBOARD_KEYS.End) {
      event.preventDefault()
      onTabChange(items[total - 1].id)
    }
  }

  const activeItem = items[activeIndex]

  return (
    <div className={styles.root}>
      <div className={styles.tabList} role="tablist" onKeyDown={onKeyDown}>
        {items.map((item) => {
          const isActive = item.id === activeTabId
          const tabId = `${baseId}-tab-${item.id}`
          const panelId = `${baseId}-panel-${item.id}`

          return (
            <button
              key={item.id}
              id={tabId}
              className={isActive ? styles.tabActive : styles.tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {activeItem ? (
        <div
          id={`${baseId}-panel-${activeItem.id}`}
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
        >
          {activeItem.panel}
        </div>
      ) : null}
    </div>
  )
}
