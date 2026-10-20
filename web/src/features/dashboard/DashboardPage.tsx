import { CheckCircle2, MapPinned, Ruler, Tractor } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FieldPlot } from '../../components/field/FieldPlot'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import { useExperiment } from '../../state/ExperimentProvider'
import { selectActiveExperiment, selectCompletedPoints, selectLatestReading } from '../../state/selectors'
import { RecentActivity } from './RecentActivity'
import { RoverSummary } from './RoverSummary'
import { SummaryCard } from './SummaryCard'

export function DashboardPage() {
  const { state } = useExperiment(); const experiment = selectActiveExperiment(state)
  if (!experiment) return <EmptyState title="No active experiment" description="Select or configure an experiment before reviewing field operations." />
  const completed = selectCompletedPoints(state); const latest = selectLatestReading(state); const completion = experiment.samplingPoints.length ? Math.round((completed / experiment.samplingPoints.length) * 100) : 0
  return <div className="dashboard-page page-stack"><div className="page-context"><ProvenanceBadge provenance={experiment.provenance} /><span>Deterministic research workspace · values are not live hardware readings</span></div><section className="summary-grid" aria-label="Field summary"><SummaryCard label="Sampling points" value={String(experiment.samplingPoints.length)} detail="Total planned locations" icon={MapPinned} /><SummaryCard label="Points completed" value={`${completed} / ${experiment.samplingPoints.length}`} detail={`${completion}% field coverage`} icon={CheckCircle2} /><SummaryCard label="Rover status" value={state.mission.status === 'idle' ? 'Idle' : state.mission.status} detail="Ready for simulated command" icon={Tractor} /><SummaryCard label="Field area" value={`${experiment.width * experiment.length} m²`} detail={`${experiment.width} m × ${experiment.length} m`} icon={Ruler} /></section><section className="dashboard-main-grid"><Card className="panel field-panel"><div className="panel__header"><div><p className="panel__eyebrow">{experiment.width} × {experiment.length} meter boundary</p><h2>Field mapping</h2></div><Link to="/sampling-planner" className="text-link" aria-label="Open sampling planner">Plan sampling →</Link></div><FieldPlot width={experiment.width} length={experiment.length} points={experiment.samplingPoints} route={experiment.samplingPoints} rover={state.mission.position} ariaLabel={`${experiment.name} field map`} /></Card><RoverSummary mission={state.mission} latest={latest} /></section><section className="dashboard-lower-grid"><RecentActivity entries={state.missionLog} /><Card className="panel readings-panel"><div className="panel__header"><div><p className="panel__eyebrow">Point measurement</p><h2>Latest soil reading</h2></div>{latest ? <ProvenanceBadge provenance={latest.provenance} /> : null}</div>{latest ? <div className="reading-grid"><div><span>Moisture</span><strong>{latest.moisture}%</strong></div><div><span>Compaction</span><strong>{latest.compaction} MPa</strong></div><div><span>Nitrogen</span><strong>{latest.nitrogen} mg/kg</strong></div><div><span>Phosphorus</span><strong>{latest.phosphorus} mg/kg</strong></div><div><span>Potassium</span><strong>{latest.potassium} mg/kg</strong></div></div> : null}<ProgressBar value={completion} label="Sampling completion" /></Card></section></div>
}
