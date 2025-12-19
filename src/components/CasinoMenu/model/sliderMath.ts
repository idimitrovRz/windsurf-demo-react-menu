import { clamp } from '../../../shared/math/clamp'

export function roundToStep(value: number, step: number): number {
  if (step <= 0) {
    return value
  }

  const rounded = Math.round(value / step) * step
  const precision = Math.max(0, Math.ceil(-Math.log10(step)))
  return Number(rounded.toFixed(precision))
}

export function clampAndStep(value: number, min: number, max: number, step: number): number {
  const clamped = clamp(value, min, max)
  return roundToStep(clamped, step)
}

export function percentFromValue(value: number, min: number, max: number): number {
  if (max === min) {
    return 0
  }

  return ((value - min) / (max - min)) * 100
}

export function valueFromPercent(percent: number, min: number, max: number): number {
  const clampedPercent = clamp(percent, 0, 100)
  return min + (clampedPercent / 100) * (max - min)
}
