import { useState } from 'react'
import { FieldPlot } from '../../components/field/FieldPlot'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import { runSamplingExample, type SamplingConfig } from '../../services/samplingService'
import { useExperiment } from '../../state/ExperimentProvider'
import { selectActiveExperiment } from '../../state/selectors'
import { PlannerConfiguration } from './PlannerConfiguration'
import { PlannerResults } from './PlannerResults'
import { WorkflowStepper } from './WorkflowStepper'

export function SamplingPlannerPage() {
  const { state, dispatch } = useExperiment(); const experiment = selectActiveExperiment(state); const [config, setConfig] = useState<SamplingConfig>({ property: 'moisture', podModes: 5, pointCount: 8 }); const [running, setRunning] = useState(false); const [error, setError] = useState('')
  if (!experiment) return <EmptyState title="No active experiment" description="Select an experiment before creating a sampling plan." />
  const plan = experiment.samplingPlan; async function run() { setRunning(true); setError(''); try { const next = await runSamplingExample(config, experiment!.measurements); dispatch({ type: 'sampling/planStored', experimentId: experiment!.id, plan: next }) } catch (caught) { setError(caught instanceof Error ? caught.message : 'Unable to prepare the example plan.') } finally { setRunning(false) } }
  const displayedPoints = plan?.points ?? experiment.samplingPoints
  return <div className="planner-page page-stack"><div className="page-context"><ProvenanceBadge provenance="algorithm-generated" /><span>Illustrative selection only · no scientific SVD/POD or QR computation is performed</span></div><Card className="panel"><WorkflowStepper /></Card><section className="planner-grid"><Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Input constraints</p><h2>Algorithm configuration</h2></div></div><PlannerConfiguration config={config} maxRows={experiment.measurements.length} running={running} onChange={setConfig} onRun={() => void run()} />{error ? <p className="inline-error" role="alert">{error}</p> : null}</Card><Card className="panel planner-map"><div className="panel__header"><div><p className="panel__eyebrow">Field candidate set</p><h2>Selected sampling locations</h2></div><ProvenanceBadge provenance={plan?.provenance ?? 'demo'} /></div><FieldPlot width={experiment.width} length={experiment.length} points={displayedPoints} selectedPointId={displayedPoints[0]?.id} /></Card><Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Example diagnostics</p><h2>Algorithm results</h2></div></div><p className="planner-disclaimer">Illustrative selection for interface evaluation; not a validated numerical result.</p><PlannerResults plan={plan} /></Card></section></div>
}
