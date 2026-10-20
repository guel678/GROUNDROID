import type { Data } from 'plotly.js'
import type { SamplingPoint, SoilLayer } from '../../types/domain'
import { Plot } from './Plot'

export function SoilHeatmap({ layer, points, showPoints, showBoundary, width, length }: { layer: SoilLayer; points: SamplingPoint[]; showPoints: boolean; showBoundary: boolean; width: number; length: number }) {
  const data: Data[] = [{ type: 'heatmap', x: layer.x, y: layer.y, z: layer.values, colorscale: 'Viridis', colorbar: { title: { text: layer.unit }, thickness: 12 }, hovertemplate: `X %{x} m<br>Y %{y} m<br>${layer.label}: %{z} ${layer.unit}<extra></extra>`, zsmooth: 'best' }]
  if (showPoints) data.push({ type: 'scatter', mode: 'markers', x: points.map((point) => point.x), y: points.map((point) => point.y), marker: { color: '#fff', line: { color: '#145c3b', width: 1.5 }, size: 8 }, name: 'Sampling points', hovertemplate: '%{x} m, %{y} m<extra>Sampling point</extra>' })
  return <Plot ariaLabel={`${layer.label} heatmap, ${layer.status} ${layer.provenance} data`} data={data} layout={{ xaxis: { title: { text: 'X (m)' }, range: showBoundary ? [0, width] : undefined }, yaxis: { title: { text: 'Y (m)' }, range: showBoundary ? [0, length] : undefined, scaleanchor: 'x' }, showlegend: false }} />
}
