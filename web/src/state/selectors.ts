import type { Experiment, ExperimentState, SoilMeasurement } from '../types/domain'

export function selectActiveExperiment(state: ExperimentState): Experiment | undefined {
  return state.experiments.find(({ id }) => id === state.activeExperimentId)
}

export function selectCompletedPoints(state: ExperimentState): number {
  return selectActiveExperiment(state)?.samplingPoints.filter(({ status }) => status === 'completed').length ?? 0
}

export function selectMissionProgress(state: ExperimentState): number {
  const total = state.mission.waypointIds.length
  if (total === 0) return 0
  return Math.round(((state.mission.currentWaypointIndex + 1) / total) * 100)
}

export function selectLatestReading(state: ExperimentState): SoilMeasurement | undefined {
  const measurements = selectActiveExperiment(state)?.measurements ?? []
  return measurements.reduce<SoilMeasurement | undefined>((latest, measurement) =>
    !latest || Date.parse(measurement.recordedAt) > Date.parse(latest.recordedAt) ? measurement : latest,
  undefined)
}
