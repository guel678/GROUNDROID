import type {
  DataProvenance,
  ReferenceDataset,
  RoverMission,
  SamplingPlan,
  SoilMeasurement,
} from './domain'

export interface ServiceResult<T> {
  ok: boolean
  data?: T
  message: string
  provenance: DataProvenance
}

export interface DatasetImportResult extends ServiceResult<ReferenceDataset> {
  measurements?: SoilMeasurement[]
  warnings: string[]
}

export type SamplingPlanResult = ServiceResult<SamplingPlan>

export interface RoverCommandAcknowledgement extends ServiceResult<RoverMission> {
  deliveredToHardware: boolean
}
