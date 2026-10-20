import { Database, Radio } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { DataProvenance } from '../../types/domain'

const provenanceMeta = {
  demo: { label: 'Demo data', icon: undefined },
  imported: { label: 'Imported data', icon: Database },
  'algorithm-generated': { label: 'Algorithm-generated', icon: undefined },
  real: { label: 'Real measurement', icon: Radio },
} satisfies Record<DataProvenance, { label: string; icon?: LucideIcon }>

export function ProvenanceBadge({ provenance, compact = false }: { provenance: DataProvenance; compact?: boolean }) {
  const { label, icon: Icon } = provenanceMeta[provenance]
  return (
    <span className={`provenance-badge provenance-badge--${provenance}`} title={compact ? label : undefined}>
      {Icon ? <Icon size={12} aria-hidden="true" /> : null}
      {compact ? <span className="sr-only">{label}</span> : label}
    </span>
  )
}
