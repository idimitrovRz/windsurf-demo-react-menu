import { describe, expect, it } from 'vitest'
import { clampAndStep, percentFromValue, roundToStep, valueFromPercent } from './sliderMath'

describe('sliderMath', () => {
  it('roundToStep rounds to step', () => {
    expect(roundToStep(1.234, 0.01)).toBe(1.23)
  })

  it('clampAndStep clamps and steps', () => {
    expect(clampAndStep(-1, 0, 2, 0.5)).toBe(0)
    expect(clampAndStep(2.1, 0, 2, 0.5)).toBe(2)
    expect(clampAndStep(1.24, 0, 2, 0.5)).toBe(1)
  })

  it('percent/value conversion is stable for endpoints', () => {
    expect(percentFromValue(0, 0, 10)).toBe(0)
    expect(percentFromValue(10, 0, 10)).toBe(100)
    expect(valueFromPercent(0, 0, 10)).toBe(0)
    expect(valueFromPercent(100, 0, 10)).toBe(10)
  })
})
