import type {
  EvaluationDataset,
  Experiment,
  ExperimentState,
  SamplingPoint,
  SoilLayer,
  SoilMeasurement,
} from '../types/domain'

const pointCoordinates = [
  [2, 2], [10, 2], [18, 2], [2, 10], [10, 10], [18, 10],
  [2, 18], [10, 18], [18, 18], [6, 6], [14, 14], [6, 14],
] as const

export const demoSamplingPoints: SamplingPoint[] = pointCoordinates.map(([x, y], index) => ({
  id: `SP-${String(index + 1).padStart(2, '0')}`,
  x,
  y,
  order: index + 1,
  status: index < 8 ? 'completed' : 'pending',
  provenance: 'demo',
}))

const measurementValues = [
  [24.1, 1.3, 45, 18, 20], [28.5, 1.1, 52, 20, 25], [26.3, 1.4, 48, 16, 22],
  [21.7, 1.2, 46, 19, 21], [23.9, 1.2, 52, 18, 25], [29.2, 1.5, 55, 21, 27],
  [22.6, 1.0, 43, 17, 19], [23.4, 1.2, 52, 18, 25],
] as const

export const demoMeasurements: SoilMeasurement[] = demoSamplingPoints.slice(0, 8).map((point, index) => {
  const [moisture, compaction, nitrogen, phosphorus, potassium] = measurementValues[index]
  return {
    id: `M-${String(index + 1).padStart(2, '0')}`,
    x: point.x,
    y: point.y,
    moisture,
    compaction,
    nitrogen,
    phosphorus,
    potassium,
    recordedAt: index === 7 ? '2025-04-27T10:24:17.000Z' : `2025-04-27T10:${String(12 + index).padStart(2, '0')}:00.000Z`,
    provenance: 'demo',
  }
})

const grid = [0, 5, 10, 15, 20]
const layer = (property: SoilLayer['property'], label: string, unit: string, values: number[][]): SoilLayer => ({
  id: `layer-${property}`,
  property,
  label,
  unit,
  x: grid,
  y: grid,
  values,
  status: 'reconstructed',
  provenance: 'demo',
})

export const demoSoilLayers: SoilLayer[] = [
  layer('moisture', 'Moisture', '%', [[18, 21, 23, 20, 19], [20, 26, 31, 25, 21], [19, 24, 28, 27, 22], [17, 22, 26, 34, 24], [16, 19, 22, 25, 21]]),
  layer('compaction', 'Compaction', 'MPa', [[1.4, 1.3, 1.2, 1.1, 1.2], [1.3, 1.2, 1.1, 1.2, 1.3], [1.2, 1.1, 1.2, 1.3, 1.4], [1.1, 1.2, 1.3, 1.4, 1.5], [1.2, 1.3, 1.4, 1.3, 1.2]]),
  layer('nitrogen', 'Nitrogen', 'mg/kg', [[42, 44, 47, 49, 46], [43, 48, 52, 51, 47], [45, 50, 54, 53, 48], [44, 49, 52, 55, 50], [41, 45, 48, 50, 47]]),
  layer('phosphorus', 'Phosphorus', 'mg/kg', [[15, 16, 18, 17, 16], [16, 18, 20, 19, 17], [17, 19, 21, 20, 18], [16, 18, 20, 22, 19], [15, 17, 18, 19, 17]]),
  layer('potassium', 'Potassium', 'mg/kg', [[18, 20, 22, 21, 19], [20, 23, 25, 24, 22], [21, 24, 27, 26, 23], [20, 23, 25, 28, 24], [18, 21, 23, 24, 22]]),
]

const demoEvaluation: EvaluationDataset = {
  id: 'evaluation-test-field',
  experimentId: 'test-field-april-2025',
  provenance: 'demo',
  pairs: [
    { pointId: 'SP-01', reference: 22.1, measured: 21.6 },
    { pointId: 'SP-02', reference: 24.5, measured: 26.0 },
    { pointId: 'SP-03', reference: 26.2, measured: 25.8 },
    { pointId: 'SP-04', reference: 21.7, measured: 22.9 },
    { pointId: 'SP-05', reference: 28.4, measured: 27.8 },
  ],
  metrics: [
    { property: 'moisture', unit: '%', mae: 1.24, rmse: 1.68, rSquared: 0.94 },
    { property: 'compaction', unit: 'MPa', mae: 0.12, rmse: 0.18, rSquared: 0.91 },
    { property: 'nitrogen', unit: 'mg/kg', mae: 4.21, rmse: 5.33, rSquared: 0.86 },
    { property: 'phosphorus', unit: 'mg/kg', mae: 2.15, rmse: 2.87, rSquared: 0.9 },
    { property: 'potassium', unit: 'mg/kg', mae: 3.12, rmse: 4.05, rSquared: 0.89 },
  ],
  reconstructionErrors: [
    { samplingCount: 5, sparse: 8.4, grid: 5.5 }, { samplingCount: 10, sparse: 3.6, grid: 4.1 },
    { samplingCount: 15, sparse: 1.9, grid: 3.5 }, { samplingCount: 20, sparse: 1.1, grid: 3.1 },
    { samplingCount: 25, sparse: 0.7, grid: 2.8 },
  ],
}

export const demoExperiments: Experiment[] = [
  {
    id: 'test-field-april-2025',
    name: 'Test Field - April 2025',
    description: 'Test field for soil-condition mapping experiment.',
    width: 20,
    length: 20,
    coordinateReference: 'Local Field (0,0)',
    createdAt: '2025-04-27T08:00:00.000Z',
    provenance: 'demo',
    measurements: demoMeasurements,
    samplingPoints: demoSamplingPoints,
    dataset: { id: 'dataset-demo', fileName: 'groundroid-demo.csv', importedAt: '2025-04-27T08:10:00.000Z', rowCount: 120, provenance: 'demo' },
    soilLayers: demoSoilLayers,
    evaluation: demoEvaluation,
  },
  {
    id: 'orchard-block-b',
    name: 'Orchard Block B',
    description: 'Secondary deterministic demo field.',
    width: 20,
    length: 24,
    coordinateReference: 'Local Field (0,0)',
    createdAt: '2025-05-09T08:00:00.000Z',
    provenance: 'demo',
    measurements: demoMeasurements.slice(0, 5),
    samplingPoints: demoSamplingPoints.slice(0, 9),
    soilLayers: demoSoilLayers,
  },
]

export const demoAppState: ExperimentState = {
  experiments: demoExperiments,
  activeExperimentId: demoExperiments[0].id,
  mission: {
    id: 'mission-demo-01',
    experimentId: demoExperiments[0].id,
    waypointIds: demoSamplingPoints.map((point) => point.id),
    currentWaypointIndex: 3,
    status: 'idle',
    connection: 'online',
    mode: 'autonomous',
    position: { x: 8.4, y: 6.2 },
    lastCommunicationAt: '2025-04-27T10:24:17.000Z',
    capabilities: { batteryTelemetry: true, returnToStart: true },
    provenance: 'demo',
  },
  missionLog: [
    { id: 'log-1', timestamp: '2025-04-27T10:15:00.000Z', message: 'Arrived at waypoint 4', level: 'info', provenance: 'demo' },
    { id: 'log-2', timestamp: '2025-04-27T10:18:00.000Z', message: 'Measurement recorded at (8.0 m, 6.0 m)', level: 'info', provenance: 'demo' },
    { id: 'log-3', timestamp: '2025-04-27T10:24:00.000Z', message: 'Rover connected to demo transport', level: 'info', provenance: 'demo' },
  ],
}
