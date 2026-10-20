import { useMemo, useState } from 'react'

import type { SamplingPoint } from '../../types/domain'
import { EmptyState } from '../ui/EmptyState'
import { FieldPlotControls } from './FieldPlotControls'

export interface FieldPlotProps {
  width: number
  length: number
  points: SamplingPoint[]
  route?: SamplingPoint[]
  rover?: { x: number; y: number }
  selectedPointId?: string
  onPointSelect?: (point: SamplingPoint) => void
  ariaLabel?: string
}

const pad = 38
const viewSize = 320

export function FieldPlot({ width, length, points, route = [], rover, selectedPointId, onPointSelect, ariaLabel = 'Field sampling map' }: FieldPlotProps) {
  const [zoom, setZoom] = useState(1)
  const plotSize = viewSize - pad * 2
  const scaleX = (x: number) => pad + (x / Math.max(width, 1)) * plotSize
  const scaleY = (y: number) => viewSize - pad - (y / Math.max(length, 1)) * plotSize
  const routePath = useMemo(() => route.map((point, index) => `${index ? 'L' : 'M'} ${scaleX(point.x)} ${scaleY(point.y)}`).join(' '), [route, width, length])
  const ticks = [0, 0.25, 0.5, 0.75, 1]

  if (points.length === 0) return <EmptyState title="No sampling locations available" description="Import a validated dataset or generate a sampling plan to populate this field." />

  return (
    <div className="field-plot">
      <div className="field-plot__canvas" style={{ '--field-zoom': zoom } as React.CSSProperties}>
        <svg viewBox={`0 0 ${viewSize} ${viewSize}`} role="img" aria-label={ariaLabel}>
          <rect x={pad} y={pad} width={plotSize} height={plotSize} className="field-plot__ground" />
          {ticks.map((tick) => <g key={tick}>
            <line x1={pad + tick * plotSize} y1={pad} x2={pad + tick * plotSize} y2={viewSize - pad} className="field-plot__grid" />
            <line x1={pad} y1={pad + tick * plotSize} x2={viewSize - pad} y2={pad + tick * plotSize} className="field-plot__grid" />
            <text x={pad + tick * plotSize} y={viewSize - 17} textAnchor="middle">{Math.round(width * tick)}</text>
            <text x={19} y={viewSize - pad - tick * plotSize + 3} textAnchor="middle">{Math.round(length * tick)}</text>
          </g>)}
          {routePath ? <path d={routePath} className="field-plot__route" /> : null}
          {points.map((point) => (
            <g key={point.id} role={onPointSelect ? 'button' : undefined} tabIndex={onPointSelect ? 0 : undefined} aria-label={`${point.id}, ${point.status}, ${point.x} meters X, ${point.y} meters Y`} onClick={() => onPointSelect?.(point)} onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && onPointSelect) onPointSelect(point) }} className="field-plot__marker-group">
              <circle cx={scaleX(point.x)} cy={scaleY(point.y)} r={selectedPointId === point.id ? 7 : 5} className={`field-plot__marker field-plot__marker--${point.status}`} />
              {point.status === 'pending' ? <circle cx={scaleX(point.x)} cy={scaleY(point.y)} r={2} className="field-plot__pending-dot" /> : null}
            </g>
          ))}
          {rover ? <g aria-label={`Rover at ${rover.x}, ${rover.y}`}><rect x={scaleX(rover.x) - 6} y={scaleY(rover.y) - 5} width={12} height={10} rx={2} className="field-plot__rover" /><circle cx={scaleX(rover.x) - 4} cy={scaleY(rover.y) + 7} r={2} /><circle cx={scaleX(rover.x) + 4} cy={scaleY(rover.y) + 7} r={2} /></g> : null}
          <text x={viewSize / 2} y={viewSize - 2} textAnchor="middle" className="field-plot__axis-title">X (m)</text>
          <text transform={`translate(8 ${viewSize / 2}) rotate(-90)`} textAnchor="middle" className="field-plot__axis-title">Y (m)</text>
        </svg>
      </div>
      <div className="field-plot__legend" aria-label="Map legend">
        <span><i className="legend-dot legend-dot--completed" />Completed</span>
        <span><i className="legend-dot legend-dot--pending" />Pending</span>
        {rover ? <span><i className="legend-square" />Rover</span> : null}
        {routePath ? <span><i className="legend-line" />Route</span> : null}
      </div>
      <FieldPlotControls onZoomIn={() => setZoom((value) => Math.min(1.3, value + 0.1))} onZoomOut={() => setZoom((value) => Math.max(0.8, value - 0.1))} onReset={() => setZoom(1)} />
    </div>
  )
}
