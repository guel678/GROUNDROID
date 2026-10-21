import { useEffect, useRef, useState } from 'react'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const meta = pageMeta[pathname] ?? pageMeta['/']

  const closeNavigation = (restoreFocus = false) => {
    setNavigationOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }

  useEffect(() => {
    if (!navigationOpen) return

    const sidebar = document.getElementById('primary-sidebar')
    const focusable = Array.from(sidebar?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusable[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeNavigation(true)
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [navigationOpen])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Sidebar
        mobileOpen={navigationOpen}
        onNavigate={() => setNavigationOpen(false)}
      />
      {navigationOpen ? (
        <button
          className="navigation-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => closeNavigation(true)}
        />
      ) : null}
      <div className="app-shell__workspace">
        <TopHeader
          menuButtonRef={menuButtonRef}
          meta={meta}
          navigationOpen={navigationOpen}
          onOpenNavigation={() => setNavigationOpen(true)}
        />
        <main className="main-content" id="main-content" inert={navigationOpen ? true : undefined}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
