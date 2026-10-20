import { LocateFixed, ZoomIn, ZoomOut } from 'lucide-react'

export function FieldPlotControls({ onZoomIn, onZoomOut, onReset }: { onZoomIn: () => void; onZoomOut: () => void; onReset: () => void }) {
  return (
    <div className="field-plot__controls" aria-label="Field view controls">
      <button type="button" onClick={onZoomIn} aria-label="Zoom in"><ZoomIn size={16} /></button>
      <button type="button" onClick={onReset} aria-label="Reset field view"><LocateFixed size={16} /></button>
      <button type="button" onClick={onZoomOut} aria-label="Zoom out"><ZoomOut size={16} /></button>
    </div>
  )
}
