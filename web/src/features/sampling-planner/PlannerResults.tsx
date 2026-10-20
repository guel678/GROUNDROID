import { DataTable } from '../../components/ui/DataTable'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import type { SamplingPlan } from '../../types/domain'

export function PlannerResults({ plan }: { plan?: SamplingPlan }) {
  if (!plan) return <p className="planner-note">Run the illustrative selection to create a reviewable plan.</p>
  return <div className="planner-results"><div className="metric-grid"><div><span>Modes retained</span><strong>{plan.podModes}</strong></div><div><span>Points selected</span><strong>{plan.points.length}</strong></div><div><span>Condition number</span><strong>{plan.conditionNumber.toExponential(2)}</strong></div><div><span>Illustrative variance</span><strong>{plan.explainedVariance}%</strong></div></div><ProvenanceBadge provenance={plan.provenance} /><DataTable caption="Selected coordinates" rows={plan.points} rowKey={(row) => row.id} columns={[{ key: 'order', header: '#', render: (row) => row.order }, { key: 'x', header: 'X (m)', align: 'right', render: (row) => row.x.toFixed(1) }, { key: 'y', header: 'Y (m)', align: 'right', render: (row) => row.y.toFixed(1) }]} /></div>
}
