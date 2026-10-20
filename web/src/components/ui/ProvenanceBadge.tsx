import { Database, FlaskConical, Radio, Sparkles } from 'lucide-react'

import type { DataProvenance } from '../../types/domain'

const provenanceMeta = {
  demo: { label: 'Demo data', icon: FlaskConical },
  imported: { label: 'Imported data', icon: Database },
  'algorithm-generated': { label: 'Algorithm-generated', icon: Sparkles },
  real: { label: 'Real measurement', icon: Radio },
} satisfies Record<DataProvenance, { label: string; icon: typeof Database }>

export function ProvenanceBadge({ provenance, compact = false }: { provenance: DataProvenance; compact?: boolean }) {
  const { label, icon: Icon } = provenanceMeta[provenance]
  return (
    <span className={`provenance-badge provenance-badge--${provenance}`} title={compact ? label : undefined}>
      <Icon size={12} aria-hidden="true" />
      {compact ? <span className="sr-only">{label}</span> : label}
    </span>
  )
}
