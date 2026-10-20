import type { ApiEnvelope, GroundroidApi, RoverTelemetryEvent, SamplingRequest } from './contracts'
import type { SamplingPlan, SoilMeasurement } from '../types/domain'

export interface HttpTransport { request<T>(path: string, init?: RequestInit): Promise<T> }
export interface TelemetryTransport { subscribe(path: string, listener: (event: unknown) => void): () => void }

export function createFutureApi(http: HttpTransport, telemetry: TelemetryTransport): GroundroidApi {
  return {
    importMeasurements: (experimentId: string, rows: SoilMeasurement[]) => http.request(`/experiments/${encodeURIComponent(experimentId)}/measurements`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ rows }) }),
    generateSamplingPlan: (request: SamplingRequest) => http.request<ApiEnvelope<SamplingPlan>>('/sampling-plans', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(request) }),
    openTelemetry: (missionId, onEvent) => telemetry.subscribe(`/missions/${encodeURIComponent(missionId)}/telemetry`, (event) => onEvent(event as RoverTelemetryEvent)),
  }
}
