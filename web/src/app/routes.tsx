import { Route, Routes } from 'react-router-dom'

import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { FieldDataPage } from '../features/field-data/FieldDataPage'
import { SamplingPlannerPage } from '../features/sampling-planner/SamplingPlannerPage'
import { RoverControlPage } from '../features/rover-control/RoverControlPage'
import { SoilMapsPage } from '../features/soil-maps/SoilMapsPage'
import { EvaluationPage } from '../features/evaluation/EvaluationPage'

export function GroundroidRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="field-data" element={<FieldDataPage />} />
        <Route path="sampling-planner" element={<SamplingPlannerPage />} />
        <Route path="rover-control" element={<RoverControlPage />} />
        <Route path="soil-maps" element={<SoilMapsPage />} />
        <Route path="evaluation" element={<EvaluationPage />} />
      </Route>
    </Routes>
  )
}
