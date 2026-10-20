import { DataTable } from '../../components/ui/DataTable'
import type { MissionLogEntry } from '../../types/domain'

export function MissionLog({ entries }: { entries: MissionLogEntry[] }) { return <DataTable caption="Simulator command log" rows={entries} rowKey={(row) => row.id} columns={[{ key: 'time', header: 'Time', render: (row) => new Date(row.timestamp).toLocaleTimeString('en-US', { hour12: false }) }, { key: 'message', header: 'Command / event', render: (row) => row.message }, { key: 'status', header: 'Source', render: (row) => row.provenance }]} /> }
