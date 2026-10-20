export type DataProvenance = 'demo' | 'imported' | 'algorithm-generated' | 'real'

export type SoilProperty = 'moisture' | 'compaction' | 'nitrogen' | 'phosphorus' | 'potassium'

export interface Provenanced {
  provenance: DataProvenance
}

export interface SoilMeasurement extends Provenanced {
  id: string
  x: number
  y: number
  moisture: number
  compaction: number
  nitrogen: number
  phosphorus: number
  potassium: number
  recordedAt: string
}

export interface SamplingPoint extends Provenanced {
  id: string
  x: number
  y: number
  order: number
  status: 'completed' | 'pending'
}

export interface ReferenceDataset extends Provenanced {
  id: string
  fileName: string
  importedAt: string
  rowCount: number
}

export interface SamplingPlan extends Provenanced {
  id: string
  createdAt: string
  property: SoilProperty
  podModes: number
  explainedVariance: number
  conditionNumber: number
  points: SamplingPoint[]
}

export interface SoilLayer extends Provenanced {
  id: string
  property: SoilProperty
  unit: string
  label: string
  values: number[][]
  x: number[]
  y: number[]
  status: 'reference' | 'reconstructed'
}

export interface EvaluationPair {
  pointId: string
  reference: number
  measured: number
}

export interface EvaluationMetric {
  property: SoilProperty
  unit: string
  mae: number
  rmse: number
  rSquared: number
}

export interface EvaluationDataset extends Provenanced {
  id: string
  experimentId: string
  pairs: EvaluationPair[]
  metrics: EvaluationMetric[]
  reconstructionErrors: Array<{ samplingCount: number; sparse: number; grid: number }>
}

export interface Experiment extends Provenanced {
  id: string
  name: string
  description: string
  width: number
  length: number
  coordinateReference: string
  createdAt: string
  measurements: SoilMeasurement[]
  samplingPoints: SamplingPoint[]
  samplingPlan?: SamplingPlan
  dataset?: ReferenceDataset
  soilLayers: SoilLayer[]
  evaluation?: EvaluationDataset
}

export interface RoverMission extends Provenanced {
  id: string
  experimentId: string
  waypointIds: string[]
  currentWaypointIndex: number
  status: 'idle' | 'running' | 'paused' | 'completed' | 'stopped'
  connection: 'online' | 'offline'
  mode: 'autonomous' | 'manual'
  position: { x: number; y: number }
  lastCommunicationAt: string
  capabilities: {
    batteryTelemetry: boolean
    returnToStart: boolean
  }
}

export interface MissionLogEntry extends Provenanced {
  id: string
  timestamp: string
  message: string
  level: 'info' | 'warning' | 'critical'
}

export interface ExperimentState {
  experiments: Experiment[]
  activeExperimentId: string | null
  mission: RoverMission
  missionLog: MissionLogEntry[]
}
