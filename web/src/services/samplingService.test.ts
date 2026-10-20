import { describe, expect, it } from 'vitest'
import { demoMeasurements } from '../data/mockData'
import { runSamplingExample } from './samplingService'

describe('runSamplingExample', () => {
  it('rejects missing datasets and invalid bounds', async () => {
    await expect(runSamplingExample({ property: 'moisture', podModes: 2, pointCount: 2 }, [])).rejects.toThrow(/dataset/i)
    await expect(runSamplingExample({ property: 'moisture', podModes: 99, pointCount: 2 }, demoMeasurements)).rejects.toThrow(/modes/i)
    await expect(runSamplingExample({ property: 'moisture', podModes: 2, pointCount: 99 }, demoMeasurements)).rejects.toThrow(/sampling points/i)
  })

  it('returns a deterministic generated example without claiming scientific execution', async () => {
    const first = await runSamplingExample({ property: 'moisture', podModes: 3, pointCount: 5 }, demoMeasurements)
    const second = await runSamplingExample({ property: 'moisture', podModes: 3, pointCount: 5 }, demoMeasurements)
    expect(first).toEqual(second)
    expect(first.provenance).toBe('algorithm-generated')
    expect(first.points).toHaveLength(5)
  })
})
