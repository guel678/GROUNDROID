import { Field } from '../../components/ui/Field'

export function SoilMapControls({ showPoints, showBoundary, onPoints, onBoundary }: { showPoints: boolean; showBoundary: boolean; onPoints: (value: boolean) => void; onBoundary: (value: boolean) => void }) {
  return <div className="map-controls">
    <Field id="map-view" label="View"><select id="map-view" value="reconstructed" disabled aria-describedby="map-view-note"><option value="reconstructed">Reconstructed map (simulated)</option></select><small id="map-view-note">Reference layers are not available in this demo.</small></Field>
    <label className="toggle-row"><span>Show sampling points</span><input type="checkbox" checked={showPoints} onChange={(event) => onPoints(event.target.checked)} /></label>
    <label className="toggle-row"><span>Show field boundary</span><input type="checkbox" checked={showBoundary} onChange={(event) => onBoundary(event.target.checked)} /></label>
    <Field id="color-scale" label="Color scale"><select id="color-scale" defaultValue="viridis"><option value="viridis">Viridis (perceptual)</option></select></Field>
  </div>
}
