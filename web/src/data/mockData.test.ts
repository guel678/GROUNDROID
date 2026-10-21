import { describe, expect, it } from 'vitest'

import { demoExperiments } from './mockData'

describe('demo experiment spatial bounds', () => {
  it('contains every sampling point and soil-layer coordinate inside the configured field', () => {
    for (const experiment of demoExperiments) {
      for (const point of experiment.samplingPoints) {
        expect(point.x, `${experiment.name}: ${point.id} x`).toBeLessThanOrEqual(experiment.width)
        expect(point.y, `${experiment.name}: ${point.id} y`).toBeLessThanOrEqual(experiment.length)
      }

      for (const layer of experiment.soilLayers) {
        expect(Math.max(...layer.x), `${experiment.name}: ${layer.label} x extent`).toBeLessThanOrEqual(experiment.width)
        expect(Math.max(...layer.y), `${experiment.name}: ${layer.label} y extent`).toBeLessThanOrEqual(experiment.length)
      }
    }
  })
})
