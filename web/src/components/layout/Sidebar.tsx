import {
  Bot,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  Map,
  MapPinned,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { getBackendHealth } from '../../services/http'

interface SidebarProps {
  mobileOpen: boolean
  onNavigate: () => void
}

const navigation: Array<{ to: string; label: string; icon: LucideIcon }> = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/field-data', label: 'Field Data', icon: ClipboardList },
  { to: '/sampling-planner', label: 'Sampling Planner', icon: MapPinned },
  { to: '/rover-control', label: 'Rover Control', icon: Bot },
  { to: '/soil-maps', label: 'Soil Maps', icon: Map },
  { to: '/evaluation', label: 'Evaluation', icon: Gauge },
]

function GroundroidMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src="/logo.png" alt="" />
    </span>
  )
}

export function Sidebar({ mobileOpen, onNavigate }: SidebarProps) {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const [indicator, setIndicator] = useState({ height: 0, y: 0, visible: false })
  const [databaseConnected, setDatabaseConnected] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    getBackendHealth()
      .then(() => {
        if (active) setDatabaseConnected(true)
      })
      .catch(() => {
        if (active) setDatabaseConnected(false)
      })
    return () => {
      active = false
    }
  }, [])

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current
      const activeLink = nav?.querySelector<HTMLElement>('[aria-current="page"]')
      if (!nav || !activeLink) return

      const navRect = nav.getBoundingClientRect()
      const activeRect = activeLink.getBoundingClientRect()
      setIndicator({
        height: activeRect.height,
        y: activeRect.top - navRect.top,
        visible: true,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [pathname])

  return (
    <aside id="primary-sidebar" className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`} aria-label="Groundroid sidebar">
      <div className="sidebar__brand">
        <GroundroidMark />
        <div className="sidebar__brand-copy">
          <strong>GROUNDROID</strong>
          <span>Soil Condition Mapping System</span>
        </div>
      </div>

      <span className="sidebar__section-label">Workspace</span>
      <nav ref={navRef} className="sidebar__nav" aria-label="Primary navigation">
        <span
          className="sidebar__active-indicator"
          data-testid="sidebar-active-indicator"
          aria-hidden="true"
          style={{
            height: indicator.height,
            opacity: indicator.visible ? 1 : 0,
            transform: `translate3d(0, ${indicator.y}px, 0)`,
          }}
        />
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
          >
            <span className="sidebar__link-icon" aria-hidden="true">
              <Icon size={18} strokeWidth={1.9} />
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <span className={`database-status database-status--${databaseConnected ? 'online' : 'offline'}`}>
          <span aria-hidden="true" />
          {databaseConnected === null
            ? 'Checking demo database'
            : databaseConnected
              ? 'SQLite connected'
              : 'Demo database offline'}
        </span>
      </div>
    </aside>
  )
}
