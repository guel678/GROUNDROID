import type { ReactNode } from 'react'

export function StatusBadge({ children, tone = 'success' }: { children: ReactNode; tone?: 'success' | 'warning' | 'danger' | 'neutral' }) {
  return <span className={`status-badge status-badge--${tone}`}>{children}</span>
}
