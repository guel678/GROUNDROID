import { lazy, Suspense } from 'react'
import type { Config, Data, Layout } from 'plotly.js'

const ReactPlot = lazy(() => import('./PlotlyRenderer'))

export function Plot({ data, layout, ariaLabel }: { data: Data[]; layout?: Partial<Layout>; ariaLabel: string }) {
  const sharedLayout: Partial<Layout> = {
    autosize: true,
    margin: { l: 52, r: 18, t: 24, b: 46 },
    font: { family: 'Inter, Segoe UI, sans-serif', color: '#172b24', size: 11 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: '#fbfdfc',
    ...layout,
  }
  const config: Partial<Config> = { responsive: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }
  return (
    <div className="plotly-shell" role="img" aria-label={ariaLabel}>
      <Suspense fallback={<div className="plotly-shell__loading">Preparing visualization…</div>}>
        <ReactPlot data={data} layout={sharedLayout} config={config} className="plotly-chart" style={{ width: '100%', height: '100%' }} />
      </Suspense>
    </div>
  )
}
