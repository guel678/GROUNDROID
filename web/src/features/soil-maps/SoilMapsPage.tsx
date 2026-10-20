import { useState } from 'react'
import { SoilHeatmap } from '../../components/charts/SoilHeatmap'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import { Tabs } from '../../components/ui/Tabs'
import { useExperiment } from '../../state/ExperimentProvider'
import { selectActiveExperiment } from '../../state/selectors'
import type { SoilProperty } from '../../types/domain'
import { MeasurementTable } from './MeasurementTable'
import { SoilMapControls } from './SoilMapControls'

const properties: Array<{ id: SoilProperty; label: string }> = [{ id: 'moisture', label: 'Moisture' }, { id: 'compaction', label: 'Compaction' }, { id: 'nitrogen', label: 'Nitrogen' }, { id: 'phosphorus', label: 'Phosphorus' }, { id: 'potassium', label: 'Potassium' }]

export function SoilMapsPage() {
  const { state } = useExperiment()
  const experiment = selectActiveExperiment(state)
  const [property, setProperty] = useState<SoilProperty>('moisture')
  const [showPoints, setShowPoints] = useState(true)
  const [showBoundary, setShowBoundary] = useState(true)
  if (!experiment) return <EmptyState title="No active experiment" description="Select an experiment to view soil maps." />
  const layer = experiment.soilLayers.find((item) => item.property === property)
  if (!layer) return <EmptyState title="Map unavailable" description={`No ${property} layer is available for this experiment.`} />
  return <div className="soil-maps-page page-stack">
    <div className="page-context"><ProvenanceBadge provenance={layer.provenance} /><span>{layer.status} surface · simulated interpolation for interface demonstration</span></div>
    <Card className="panel map-tabs-card"><Tabs label="Soil property" items={properties} active={property} onChange={setProperty} /></Card>
    <div id={`soil-property-panel-${property}`} role="tabpanel" aria-labelledby={`soil-property-tab-${property}`} className="soil-property-panel"><section className="soil-map-grid">
      <Card className="panel soil-map-panel"><div className="panel__header"><div><p className="panel__eyebrow">{layer.status} surface</p><h2>{layer.label} map</h2></div><span className="unit-pill">{layer.unit}</span></div><SoilHeatmap layer={layer} points={experiment.samplingPoints} showPoints={showPoints} showBoundary={showBoundary} width={experiment.width} length={experiment.length} /></Card>
      <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Visualization settings</p><h2>Map controls</h2></div></div><SoilMapControls showPoints={showPoints} showBoundary={showBoundary} onPoints={setShowPoints} onBoundary={setShowBoundary} /></Card>
    </section></div>
    <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Supporting observations</p><h2>Sampling points ({experiment.measurements.length})</h2></div><span className="unit-pill">{layer.unit}</span></div><MeasurementTable measurements={experiment.measurements} property={property} unit={layer.unit} /></Card>
  </div>
}
