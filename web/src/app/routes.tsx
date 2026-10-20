import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { FieldDataPage } from '../features/field-data/FieldDataPage'

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
        <Route path="sampling-planner" element={<PagePlaceholder>Data-Driven Sampling Planner</PagePlaceholder>} />
        <Route path="rover-control" element={<PagePlaceholder>Rover Mission Control</PagePlaceholder>} />
        <Route path="soil-maps" element={<PagePlaceholder>Soil Condition Maps</PagePlaceholder>} />
        <Route path="evaluation" element={<PagePlaceholder>System Performance Evaluation</PagePlaceholder>} />
      </Route>
    </Routes>
  )
}
