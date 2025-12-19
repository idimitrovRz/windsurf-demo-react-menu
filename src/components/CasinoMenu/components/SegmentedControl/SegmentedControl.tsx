import styles from './SegmentedControl.module.css'

export type SegmentedOption<TId extends string> = Readonly<{
  id: TId
  label: string
}>

type SegmentedControlProps<TId extends string> = Readonly<{
  activeId: TId
  options: ReadonlyArray<SegmentedOption<TId>>
  onChange: (next: TId) => void
  ariaLabel: string
}>

export function SegmentedControl<TId extends string>(props: SegmentedControlProps<TId>) {
  const { activeId, options, onChange, ariaLabel } = props

  return (
    <div className={styles.root} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = option.id === activeId
        return (
          <button
            key={option.id}
            type="button"
            className={isActive ? styles.optionActive : styles.option}
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
