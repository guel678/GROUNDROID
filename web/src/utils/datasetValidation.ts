import type { SoilMeasurement } from '../types/domain'

const aliases = { id: ['id', 'point_id'], x: ['x', 'x_m'], y: ['y', 'y_m'], moisture: ['moisture', 'moisture_%'], compaction: ['compaction', 'compaction_mpa'], nitrogen: ['n', 'nitrogen', 'nitrogen_mgkg'], phosphorus: ['p', 'phosphorus', 'phosphorus_mgkg'], potassium: ['k', 'potassium', 'potassium_mgkg'] } as const
type FieldName = keyof typeof aliases
export interface DatasetValidationResult { valid: boolean; measurements: SoilMeasurement[]; errors: string[] }

function findValue(row: Record<string, string>, field: FieldName) { const key = aliases[field].find((alias) => Object.hasOwn(row, alias)); return key ? row[key] : undefined }

export function validateReferenceRows(rows: Record<string, string>[]): DatasetValidationResult {
  const errors: string[] = []; const measurements: SoilMeasurement[] = []; const ids = new Set<string>()
  if (!rows.length) return { valid: false, measurements, errors: ['Dataset contains no rows.'] }
  for (const field of Object.keys(aliases) as FieldName[]) if (!aliases[field].some((alias) => Object.hasOwn(rows[0], alias))) errors.push(`Missing required column: ${field}.`)
  rows.forEach((row, index) => {
    const rowNumber = index + 2; const id = findValue(row, 'id')?.trim() ?? ''
    if (!id) errors.push(`Row ${rowNumber}: id is required.`); else if (ids.has(id)) errors.push(`Row ${rowNumber}: duplicate id "${id}".`); else ids.add(id)
    const values = {} as Record<Exclude<FieldName, 'id'>, number>
    for (const field of Object.keys(aliases).filter((key) => key !== 'id') as Exclude<FieldName, 'id'>[]) { const raw = findValue(row, field); const parsed = raw === undefined || raw === '' ? Number.NaN : Number(raw); if (!Number.isFinite(parsed)) errors.push(`Row ${rowNumber}: ${field} must be numeric.`); values[field] = parsed }
    if (id && Object.values(values).every(Number.isFinite)) measurements.push({ id, ...values, recordedAt: new Date(Date.UTC(2025, 3, 27, 10, index)).toISOString(), provenance: 'imported' })
  })
  return { valid: errors.length === 0, measurements: errors.length ? [] : measurements, errors }
}
