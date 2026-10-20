import {
  Bot,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  Map,
  MapPinned,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCollapse: () => void
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
      <span className="brand-mark__leaf brand-mark__leaf--left" />
      <span className="brand-mark__leaf brand-mark__leaf--right" />
      <span className="brand-mark__stem" />
    </span>
  )
}

export function Sidebar({ collapsed, mobileOpen, onCollapse, onNavigate }: SidebarProps) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`} aria-label="Groundroid sidebar">
      <div className="sidebar__brand">
        <GroundroidMark />
        <div className="sidebar__brand-copy">
          <strong>GROUNDROID</strong>
          <span>Soil Condition Mapping System</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="demo-chip"><span aria-hidden="true" /> Demo workspace</span>
        <button
          className="sidebar__collapse"
          type="button"
          onClick={onCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  )
}
