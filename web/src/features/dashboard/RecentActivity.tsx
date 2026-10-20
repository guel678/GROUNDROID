import { Card } from '../../components/ui/Card'
import type { MissionLogEntry } from '../../types/domain'

export function RecentActivity({ entries }: { entries: MissionLogEntry[] }) {
  return <Card className="panel activity-panel"><div className="panel__header"><div><p className="panel__eyebrow">Research timeline</p><h2>Recent activity</h2></div><span className="muted-label">Latest first</span></div><ol className="activity-list">{[...entries].reverse().map((entry) => <li key={entry.id}><time dateTime={entry.timestamp}>{new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</time><span>{entry.message}</span></li>)}</ol></Card>
}
