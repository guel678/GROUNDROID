import { describe, expect, it } from 'vitest'
import { toCsv } from './export'
import { calculateRmse } from './metrics'

describe('evaluation utilities', () => {
  it('calculates RMSE and returns null for empty arrays', () => { expect(calculateRmse([1, 2, 3], [1, 3, 5])).toBeCloseTo(Math.sqrt(5 / 3)); expect(calculateRmse([], [])).toBeNull() })
  it('rejects mismatched arrays', () => { expect(() => calculateRmse([1], [1, 2])).toThrow(/same length/i) })
  it('escapes formulas, commas, and quotes in CSV export', () => { const csv = toCsv([{ name: '=cmd', note: 'a,"b"' }]); expect(csv).toContain("'="); expect(csv).toContain('"a,""b"""') })
})
