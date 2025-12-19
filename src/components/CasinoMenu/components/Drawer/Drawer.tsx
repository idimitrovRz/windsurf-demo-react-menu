import { useEffect, useRef } from 'react'
import styles from './Drawer.module.css'
import { KEYBOARD_KEYS, MENU_Z_INDEX } from '../../model/tokens'

type DrawerProps = Readonly<{
  isOpen: boolean
  onRequestClose: () => void
  ariaLabel: string
  children: React.ReactNode
}>

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const selector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  )
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onRequestClose, ariaLabel, children } = props

  const panelRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    const panel = panelRef.current
    if (!panel) {
      return
    }

    const focusables = getFocusableElements(panel)
    const first = focusables[0]
    if (first) {
      first.focus()
    }

    return () => {
      previouslyFocusedRef.current?.focus?.()
      previouslyFocusedRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_KEYS.Escape) {
        event.preventDefault()
        onRequestClose()
        return
      }

      if (event.key !== KEYBOARD_KEYS.Tab) {
        return
      }

      const panel = panelRef.current
      if (!panel) {
        return
      }

      const focusables = getFocusableElements(panel)
      if (focusables.length === 0) {
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onRequestClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.root} style={{ zIndex: MENU_Z_INDEX }}>
      <button
        type="button"
        className={styles.overlay}
        onClick={onRequestClose}
        aria-label="Close menu"
      />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  )
}
