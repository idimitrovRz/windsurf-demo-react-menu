import { useMemo, useRef, useState } from 'react'
import styles from './Slider.module.css'
import { clampAndStep, percentFromValue, valueFromPercent } from '../../model/sliderMath'
import { KEYBOARD_KEYS } from '../../model/tokens'

type SliderProps = Readonly<{
  id: string
  label: string
  min: number
  max: number
  value: number
  dragStep: number
  keyboardStep: number
  keyboardStepLarge: number
  formatValue: (value: number) => string
  onChange: (next: number) => void
}>

type DragState = Readonly<{
  pointerId: number
}>

function getPercentFromEvent(event: PointerEvent, track: HTMLElement): number {
  const rect = track.getBoundingClientRect()
  if (rect.width <= 0) {
    return 0
  }

  const x = event.clientX - rect.left
  return (x / rect.width) * 100
}

export function Slider(props: SliderProps) {
  const {
    id,
    label,
    min,
    max,
    value,
    dragStep,
    keyboardStep,
    keyboardStepLarge,
    formatValue,
    onChange,
  } = props

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const percent = useMemo(() => percentFromValue(value, min, max), [max, min, value])

  const setFromPercent = (rawPercent: number) => {
    const nextValue = valueFromPercent(rawPercent, min, max)
    const stepped = clampAndStep(nextValue, min, max, dragStep)
    onChange(stepped)
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) {
      return
    }

    track.setPointerCapture(event.pointerId)
    setDragState({ pointerId: event.pointerId })

    setFromPercent(getPercentFromEvent(event.nativeEvent, track))
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    setFromPercent(getPercentFromEvent(event.nativeEvent, track))
  }

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null)
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let delta = 0
    if (event.key === KEYBOARD_KEYS.ArrowRight || event.key === KEYBOARD_KEYS.ArrowUp) {
      delta = event.shiftKey ? keyboardStepLarge : keyboardStep
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft || event.key === KEYBOARD_KEYS.ArrowDown) {
      delta = -(event.shiftKey ? keyboardStepLarge : keyboardStep)
    }

    if (delta === 0) {
      return
    }

    event.preventDefault()
    onChange(clampAndStep(value + delta, min, max, dragStep))
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{formatValue(value)}</div>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
        <button
          id={id}
          type="button"
          className={styles.thumb}
          style={{ left: `${percent}%` }}
          role="slider"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue(value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}
