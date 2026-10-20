import type { LucideIcon } from 'lucide-react'
import { Card } from '../../components/ui/Card'

export function SummaryCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return <Card className="summary-card"><span className="summary-card__icon"><Icon size={17} aria-hidden="true" /></span><div><span className="summary-card__label">{label}</span><strong>{value}</strong><small>{detail}</small></div></Card>
}
