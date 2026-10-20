import { GroundroidRoutes } from './routes'
import { ExperimentProvider } from '../state/ExperimentProvider'

export function App() {
  return (
    <ExperimentProvider>
      <GroundroidRoutes />
    </ExperimentProvider>
  )
}
