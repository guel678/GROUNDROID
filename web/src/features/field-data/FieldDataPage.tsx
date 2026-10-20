import { CheckCircle2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import { useExperiment } from '../../state/ExperimentProvider'
import { selectActiveExperiment } from '../../state/selectors'
import { CsvUpload } from './CsvUpload'
import { DatasetPreview } from './DatasetPreview'
import { FieldConfigurationForm } from './FieldConfigurationForm'

export function FieldDataPage() {
  const { state, dispatch } = useExperiment(); const experiment = selectActiveExperiment(state)
  if (!experiment) return <EmptyState title="No active experiment" description="Select an experiment before editing field data." />
  return <div className="field-data-page page-stack"><div className="page-context"><ProvenanceBadge provenance={experiment.dataset?.provenance ?? experiment.provenance} /><span>{experiment.dataset?.rowCount ?? 0} active records · imports replace data only after complete validation</span></div><section className="field-data-grid"><Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Research boundary</p><h2>Field configuration</h2></div></div><FieldConfigurationForm experiment={experiment} onSave={(changes) => dispatch({ type: 'experiment/configurationUpdated', experimentId: experiment.id, changes })} /></Card><Card className="panel upload-panel"><div className="panel__header"><div><p className="panel__eyebrow">Validated input only</p><h2>Reference dataset upload</h2></div></div><CsvUpload onValid={(measurements, fileName) => dispatch({ type: 'dataset/imported', experimentId: experiment.id, measurements, fileName })} /><div className="required-columns"><h3>Required columns</h3>{['ID', 'X coordinate (m)', 'Y coordinate (m)', 'Moisture (%)', 'Compaction (MPa)', 'Nitrogen (mg/kg)', 'Phosphorus (mg/kg)', 'Potassium (mg/kg)'].map((column) => <span key={column}><CheckCircle2 size={13} />{column}</span>)}</div></Card></section><Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">First six rows</p><h2>Dataset preview</h2></div><ProvenanceBadge provenance={experiment.dataset?.provenance ?? experiment.provenance} /></div><DatasetPreview measurements={experiment.measurements} /></Card></div>
}
