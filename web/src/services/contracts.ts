import type { DataProvenance, RoverMission, SamplingPlan, SoilMeasurement } from '../types/domain'

export interface ApiEnvelope<T> { data: T; provenance: DataProvenance; generatedAt: string }
export interface BackendHealth { status: 'ok'; database: 'sqlite' }
export interface SamplingRequest { experimentId: string; property: string; podModes: number; pointCount: number }
export interface RoverTelemetryEvent { mission: RoverMission; latestMeasurement?: SoilMeasurement; sequence: number }
export interface GroundroidApi {
  importMeasurements(experimentId: string, rows: SoilMeasurement[]): Promise<ApiEnvelope<{ imported: number }>>
  generateSamplingPlan(request: SamplingRequest): Promise<ApiEnvelope<SamplingPlan>>
  openTelemetry(missionId: string, onEvent: (event: RoverTelemetryEvent) => void): () => void
}
