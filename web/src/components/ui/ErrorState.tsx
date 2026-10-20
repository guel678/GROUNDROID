import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

export function ErrorState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="state-panel state-panel--error" role="alert">
      <AlertTriangle size={24} aria-hidden="true" />
      <strong>{title}</strong>
      <p>{description}</p>
      {action}
    </div>
  )
}
