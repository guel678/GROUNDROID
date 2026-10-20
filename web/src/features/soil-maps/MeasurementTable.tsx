import { DataTable } from '../../components/ui/DataTable'
import type { SoilMeasurement, SoilProperty } from '../../types/domain'

export function MeasurementTable({ measurements, property, unit }: { measurements: SoilMeasurement[]; property: SoilProperty; unit: string }) { return <DataTable caption={`${property} sampling measurements`} rows={measurements} rowKey={(row) => row.id} columns={[{ key: 'id', header: '#', render: (row) => row.id }, { key: 'x', header: 'X (m)', align: 'right', render: (row) => row.x.toFixed(1) }, { key: 'y', header: 'Y (m)', align: 'right', render: (row) => row.y.toFixed(1) }, { key: 'value', header: `${property} (${unit})`, align: 'right', render: (row) => row[property].toFixed(property === 'compaction' ? 2 : 1) }]} /> }
