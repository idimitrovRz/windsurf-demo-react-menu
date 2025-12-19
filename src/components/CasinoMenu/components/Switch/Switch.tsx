import styles from './Switch.module.css'

type SwitchProps = Readonly<{
  id: string
  label: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
}>

export function Switch(props: SwitchProps) {
  const { id, label, checked, onCheckedChange } = props
  const labelId = `${id}-label`

  return (
    <div className={styles.root}>
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-labelledby={labelId}
        aria-checked={checked}
        className={checked ? styles.switchOn : styles.switchOff}
        onClick={() => onCheckedChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  )
}
