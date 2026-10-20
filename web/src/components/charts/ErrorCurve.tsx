import type { Data } from 'plotly.js'
import type { EvaluationDataset } from '../../types/domain'
import { Plot } from './Plot'

export function ErrorCurve({ rows }: { rows: EvaluationDataset['reconstructionErrors'] }) { const data: Data[] = [{ type: 'scatter', mode: 'lines+markers', x: rows.map((row) => row.samplingCount), y: rows.map((row) => row.sparse), name: 'Sparse example', line: { color: '#168451' } }, { type: 'scatter', mode: 'lines+markers', x: rows.map((row) => row.samplingCount), y: rows.map((row) => row.grid), name: 'Fixed grid', line: { color: '#52685d' } }]; return <Plot ariaLabel="Reconstruction error by sampling count" data={data} layout={{ xaxis: { title: { text: 'Number of sampling points' } }, yaxis: { title: { text: 'Illustrative RMSE' }, type: 'log' }, legend: { orientation: 'h' } }} /> }
