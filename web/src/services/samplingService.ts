import type { SamplingPlan, SoilMeasurement, SoilProperty } from '../types/domain'

export interface SamplingConfig { property: SoilProperty; podModes: number; pointCount: number }

export async function runSamplingExample(config: SamplingConfig, dataset: SoilMeasurement[]): Promise<SamplingPlan> {
  if (!dataset.length) throw new Error('A validated dataset is required.')
  if (!Number.isInteger(config.podModes) || config.podModes < 1 || config.podModes > dataset.length) throw new Error(`POD modes must be between 1 and ${dataset.length}.`)
  if (!Number.isInteger(config.pointCount) || config.pointCount < 1 || config.pointCount > dataset.length) throw new Error(`Sampling points must be between 1 and ${dataset.length}.`)
  const selected = Array.from({ length: config.pointCount }, (_, index) => dataset[Math.floor((index * dataset.length) / config.pointCount)])
  return { id: `example-${config.property}-${config.podModes}-${config.pointCount}`, createdAt: '2025-04-27T10:25:00.000Z', provenance: 'algorithm-generated', property: config.property, podModes: config.podModes, explainedVariance: 94.2, conditionNumber: 23.4, points: selected.map((item, index) => ({ id: `P-${index + 1}`, x: item.x, y: item.y, order: index + 1, status: 'pending', provenance: 'algorithm-generated' })) }
}
