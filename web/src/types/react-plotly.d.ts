declare module 'react-plotly.js' {
  import type { ComponentType } from 'react'
  import type { Config, Data, Layout } from 'plotly.js'
  const Plot: ComponentType<{ data: Data[]; layout?: Partial<Layout>; config?: Partial<Config>; className?: string; style?: React.CSSProperties; useResizeHandler?: boolean }>
  export default Plot
}
