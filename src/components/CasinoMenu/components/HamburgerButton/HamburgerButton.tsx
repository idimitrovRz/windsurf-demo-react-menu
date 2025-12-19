import styles from './HamburgerButton.module.css'

type HamburgerButtonProps = Readonly<{
  isOpen: boolean
  onClick: () => void
  ariaLabel?: string
}>

export function HamburgerButton(props: HamburgerButtonProps) {
  const { isOpen, onClick, ariaLabel } = props

  return (
    <button
      type="button"
      className={isOpen ? styles.buttonOpen : styles.button}
      onClick={onClick}
      aria-label={ariaLabel ?? 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className={styles.bar} aria-hidden="true" />
      <span className={styles.bar} aria-hidden="true" />
      <span className={styles.bar} aria-hidden="true" />
    </button>
  )
}
