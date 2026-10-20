import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Field Dashboard',
    description: 'Overview of field operations and soil-condition sampling.',
  },
  '/field-data': {
    title: 'Field Data & Configuration',
    description: 'Manage the research inputs required for soil-condition mapping.',
  },
  '/sampling-planner': {
    title: 'Data-Driven Sampling Planner',
    description: 'Identify informative sampling locations using SVD/POD and QR pivoting.',
  },
  '/rover-control': {
    title: 'Rover Mission Control',
    description: 'Monitor the simulated rover during soil measurement activities.',
  },
  '/soil-maps': {
    title: 'Soil Condition Maps',
    description: 'Visualize reconstructed soil properties from sparse measurements.',
  },
  '/evaluation': {
    title: 'System Performance Evaluation',
    description: 'Review measurement, reconstruction, and system-efficiency results.',
  },
}

export function AppShell() {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const { pathname } = useLocation()
  const meta = pageMeta[pathname] ?? pageMeta['/']

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={navigationOpen}
        onNavigate={() => setNavigationOpen(false)}
      />
      {navigationOpen ? (
        <button
          className="navigation-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavigationOpen(false)}
        />
      ) : null}
      <div className="app-shell__workspace">
        <TopHeader meta={meta} onOpenNavigation={() => setNavigationOpen(true)} />
        <main className="main-content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
