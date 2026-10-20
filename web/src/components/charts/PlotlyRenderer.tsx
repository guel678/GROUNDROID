import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Config, Data, Layout } from 'plotly.js'
import Plotly from 'plotly.js-cartesian-dist-min'

interface PlotlyRendererProps {
  data: Data[]
  layout?: Partial<Layout>
  config?: Partial<Config>
  className?: string
  style?: CSSProperties
}

export default function PlotlyRenderer({ data, layout, config, className, style }: PlotlyRendererProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    setError(false)
    let disposed = false
    void Plotly.react(chart, data, layout, config).catch((cause: unknown) => {
      if (!disposed) {
        console.error('Unable to render Plotly visualization.', cause)
        setError(true)
      }
    })

    return () => {
      disposed = true
      Plotly.purge(chart)
    }
  }, [config, data, layout])

  if (error) {
    return <div className="plotly-shell__loading">Visualization unavailable.</div>
  }

  return <div ref={chartRef} className={className} style={style} />
}
