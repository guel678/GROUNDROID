import { describe, expect, it } from 'vitest'

import { demoAppState, demoExperiments } from '../data/mockData'
import type { SoilMeasurement } from '../types/domain'
import { experimentReducer } from './experimentReducer'
import { selectActiveExperiment, selectLatestReading, selectMissionProgress } from './selectors'

describe('experimentReducer', () => {
  it('selects an experiment without mutating the previous state', () => {
    const previous = demoAppState
    const next = experimentReducer(previous, { type: 'experiment/selected', experimentId: demoExperiments[1].id })

    expect(next).not.toBe(previous)
    expect(next.activeExperimentId).toBe(demoExperiments[1].id)
    expect(previous.activeExperimentId).toBe(demoExperiments[0].id)
    expect(next.mission.experimentId).toBe(demoExperiments[1].id)
    expect(next.mission.waypointIds).toEqual(demoExperiments[1].samplingPoints.map(({ id }) => id))
    expect(next.mission.currentWaypointIndex).toBe(0)
  })

  it('updates field configuration while preserving provenance', () => {
    const next = experimentReducer(demoAppState, {
      type: 'experiment/configurationUpdated',
      experimentId: demoExperiments[0].id,
      changes: { name: 'North Field Trial', width: 24, length: 18 },
    })

    expect(selectActiveExperiment(next)).toMatchObject({ name: 'North Field Trial', width: 24, length: 18 })
    expect(selectActiveExperiment(next)?.provenance).toBe('demo')
  })

  it('replaces measurements only after a validated import and preserves imported provenance', () => {
    const imported: SoilMeasurement[] = [
      {
        id: 'import-1',
        x: 3,
        y: 7,
        moisture: 28.4,
        compaction: 1.18,
        nitrogen: 44,
        phosphorus: 17,
        potassium: 23,
        recordedAt: '2026-10-20T02:00:00.000Z',
        provenance: 'imported',
      },
    ]

    const next = experimentReducer(demoAppState, {
      type: 'dataset/imported',
      experimentId: demoExperiments[0].id,
      measurements: imported,
      fileName: 'north-field.csv',
    })

    expect(selectActiveExperiment(next)?.measurements).toEqual(imported)
    expect(selectActiveExperiment(next)?.dataset).toMatchObject({ fileName: 'north-field.csv', provenance: 'imported' })
    expect(demoAppState.experiments[0].measurements).not.toEqual(imported)
  })

  it('stores generated sampling plans without relabeling them as measured data', () => {
    const plan = {
      id: 'plan-test',
      createdAt: '2026-10-20T02:05:00.000Z',
      provenance: 'algorithm-generated' as const,
      property: 'moisture' as const,
      podModes: 5,
      explainedVariance: 94.2,
      conditionNumber: 23.4,
      points: demoExperiments[0].samplingPoints.slice(0, 4),
    }
    const next = experimentReducer(demoAppState, {
      type: 'sampling/planStored',
      experimentId: demoExperiments[0].id,
      plan,
    })

    expect(selectActiveExperiment(next)?.samplingPlan).toEqual(plan)
    expect(selectActiveExperiment(next)?.measurements[0].provenance).toBe('demo')
  })

  it('advances and resets the simulated mission within waypoint bounds', () => {
    const advanced = experimentReducer(demoAppState, { type: 'mission/advanced', steps: 3 })
    expect(advanced.mission.currentWaypointIndex).toBe(6)
    expect(selectMissionProgress(advanced)).toBe(58)

    const capped = experimentReducer(advanced, { type: 'mission/advanced', steps: 99 })
    expect(capped.mission.currentWaypointIndex).toBe(capped.mission.waypointIds.length - 1)

    const reset = experimentReducer(capped, { type: 'mission/reset' })
    expect(reset.mission.currentWaypointIndex).toBe(0)
    expect(reset.mission.status).toBe('idle')
  })

  it('selects the chronologically latest reading', () => {
    expect(selectLatestReading(demoAppState)?.recordedAt).toBe('2025-04-27T10:24:17.000Z')
  })
})
