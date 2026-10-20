import { lazy, Suspense, useEffect, useState } from 'react'
import type { Config, Data, Layout } from 'plotly.js'

const ReactPlot = lazy(() => import('./PlotlyRenderer'))

export function Plot({ data, layout, mobileLayout, ariaLabel }: { data: Data[]; layout?: Partial<Layout>; mobileLayout?: Partial<Layout>; ariaLabel: string }) {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 480px)')
    const update = () => setCompact(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const sharedLayout: Partial<Layout> = {
    autosize: true,
    margin: { l: 52, r: 18, t: 24, b: 46 },
    font: { family: 'Inter, Segoe UI, sans-serif', color: '#172b24', size: 11 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: '#fbfdfc',
    ...layout,
    ...(compact ? mobileLayout : undefined),
    xaxis: { ...layout?.xaxis, ...(compact ? mobileLayout?.xaxis : undefined) },
    yaxis: { ...layout?.yaxis, ...(compact ? mobileLayout?.yaxis : undefined) },
  }
  const config: Partial<Config> = { responsive: true, displaylogo: false, displayModeBar: compact ? false : 'hover', modeBarButtonsToRemove: ['lasso2d', 'select2d'] }
  return (
    <div className="plotly-shell" role="img" aria-label={ariaLabel}>
      <Suspense fallback={<div className="plotly-shell__loading">Preparing visualization…</div>}>
        <ReactPlot data={data} layout={sharedLayout} config={config} className="plotly-chart" style={{ width: '100%', height: '100%' }} />
      </Suspense>
    </div>
  )
}
