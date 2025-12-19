import { describe, expect, it } from 'vitest'
import { clamp } from './clamp'

describe('clamp', () => {
  it('clamps below min', () => {
    expect(clamp(-1, 0, 10)).toBe(0)
  })

  it('clamps above max', () => {
    expect(clamp(11, 0, 10)).toBe(10)
  })

  it('returns value in range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
})
