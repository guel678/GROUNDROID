import { DataTable } from '../../components/ui/DataTable'
import type { SoilMeasurement } from '../../types/domain'

export function DatasetPreview({ measurements }: { measurements: SoilMeasurement[] }) {
  return <DataTable caption="Dataset preview" rows={measurements.slice(0, 6)} rowKey={(row) => row.id} columns={[{ key: 'id', header: '#', render: (row) => row.id }, { key: 'x', header: 'X (m)', align: 'right', render: (row) => row.x.toFixed(1) }, { key: 'y', header: 'Y (m)', align: 'right', render: (row) => row.y.toFixed(1) }, { key: 'moisture', header: 'Moisture (%)', align: 'right', render: (row) => row.moisture.toFixed(1) }, { key: 'compaction', header: 'Compaction (MPa)', align: 'right', render: (row) => row.compaction.toFixed(2) }, { key: 'npk', header: 'N / P / K', align: 'right', render: (row) => `${row.nitrogen} / ${row.phosphorus} / ${row.potassium}` }]} />
}
