import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { FieldDataPage } from '../features/field-data/FieldDataPage'
import { SamplingPlannerPage } from '../features/sampling-planner/SamplingPlannerPage'
import { RoverControlPage } from '../features/rover-control/RoverControlPage'
import { SoilMapsPage } from '../features/soil-maps/SoilMapsPage'

function PagePlaceholder({ children }: { children: ReactNode }) {
  return (
    <section className="page-placeholder" aria-label={`${String(children)} content`}>
      <p className="eyebrow">Groundroid research workspace</p>
      <h2>{children}</h2>
      <p>This research surface is being assembled from the approved Groundroid specification.</p>
    </section>
  )
}

export function GroundroidRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="field-data" element={<FieldDataPage />} />
        <Route path="sampling-planner" element={<SamplingPlannerPage />} />
        <Route path="rover-control" element={<RoverControlPage />} />
        <Route path="soil-maps" element={<SoilMapsPage />} />
        <Route path="evaluation" element={<PagePlaceholder>System Performance Evaluation</PagePlaceholder>} />
      </Route>
    </Routes>
  )
}
