import type { Experiment, ExperimentState, RoverMission, SamplingPlan, SoilMeasurement } from '../types/domain'

function createMissionForExperiment(experiment: Experiment, previous: RoverMission): RoverMission {
  const firstPoint = experiment.samplingPoints[0]
  return {
    ...previous,
    id: `mission-${experiment.id}`,
    experimentId: experiment.id,
    waypointIds: experiment.samplingPoints.map(({ id }) => id),
    currentWaypointIndex: 0,
    status: 'idle',
    position: firstPoint ? { x: firstPoint.x, y: firstPoint.y } : { x: 0, y: 0 },
    lastCommunicationAt: experiment.createdAt,
  }
}

export type ExperimentAction =
  | { type: 'experiment/selected'; experimentId: string }
  | { type: 'experiment/configurationUpdated'; experimentId: string; changes: { name?: string; description?: string; width?: number; length?: number; coordinateReference?: string } }
  | { type: 'dataset/imported'; experimentId: string; measurements: SoilMeasurement[]; fileName: string }
  | { type: 'sampling/planStored'; experimentId: string; plan: SamplingPlan }
  | { type: 'mission/advanced'; steps?: number }
  | { type: 'mission/reset' }
  | { type: 'mission/replaced'; mission: RoverMission }
  | { type: 'mission/statusChanged'; status: ExperimentState['mission']['status'] }

export function experimentReducer(state: ExperimentState, action: ExperimentAction): ExperimentState {
  switch (action.type) {
    case 'experiment/selected':
      {
        const experiment = state.experiments.find(({ id }) => id === action.experimentId)
        return experiment
          ? { ...state, activeExperimentId: action.experimentId, mission: createMissionForExperiment(experiment, state.mission) }
          : state
      }
    case 'experiment/configurationUpdated':
      return {
        ...state,
        experiments: state.experiments.map((experiment) =>
          experiment.id === action.experimentId ? { ...experiment, ...action.changes } : experiment,
        ),
      }
    case 'dataset/imported':
      return {
        ...state,
        experiments: state.experiments.map((experiment) =>
          experiment.id === action.experimentId
            ? {
                ...experiment,
                measurements: action.measurements,
                dataset: {
                  id: `dataset-${action.experimentId}-${action.fileName}`,
                  fileName: action.fileName,
                  importedAt: new Date().toISOString(),
                  rowCount: action.measurements.length,
                  provenance: 'imported',
                },
              }
            : experiment,
        ),
      }
    case 'sampling/planStored':
      return {
        ...state,
        experiments: state.experiments.map((experiment) =>
          experiment.id === action.experimentId ? { ...experiment, samplingPlan: action.plan } : experiment,
        ),
      }
    case 'mission/advanced': {
      const lastIndex = Math.max(0, state.mission.waypointIds.length - 1)
      const currentWaypointIndex = Math.min(lastIndex, state.mission.currentWaypointIndex + Math.max(1, action.steps ?? 1))
      return {
        ...state,
        mission: {
          ...state.mission,
          currentWaypointIndex,
          status: currentWaypointIndex === lastIndex ? 'completed' : 'running',
        },
      }
    }
    case 'mission/reset':
      return { ...state, mission: { ...state.mission, currentWaypointIndex: 0, status: 'idle' } }
    case 'mission/replaced':
      return action.mission.experimentId === state.activeExperimentId ? { ...state, mission: action.mission } : state
    case 'mission/statusChanged':
      return { ...state, mission: { ...state.mission, status: action.status } }
    default:
      return state
  }
}
