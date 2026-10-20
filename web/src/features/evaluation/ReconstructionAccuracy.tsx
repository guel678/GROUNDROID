import { ErrorCurve } from '../../components/charts/ErrorCurve'
import { Card } from '../../components/ui/Card'
import type { EvaluationDataset } from '../../types/domain'
export function ReconstructionAccuracy({ dataset }: { dataset: EvaluationDataset }) { return <Card className="panel chart-card"><div className="panel__header"><div><p className="panel__eyebrow">Sampling-density study</p><h2>Reconstruction error comparison</h2></div></div><ErrorCurve rows={dataset.reconstructionErrors} /></Card> }
