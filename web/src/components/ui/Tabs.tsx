import type { ReactNode } from 'react'

export interface TabItem<T extends string> { id: T; label: string; icon?: ReactNode }

export function Tabs<T extends string>({ items, active, onChange, label }: { items: TabItem<T>[]; active: T; onChange: (id: T) => void; label: string }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((item) => (
        <button key={item.id} type="button" role="tab" aria-selected={active === item.id} className={active === item.id ? 'tabs__tab tabs__tab--active' : 'tabs__tab'} onClick={() => onChange(item.id)}>
          {item.icon}{item.label}
        </button>
      ))}
    </div>
  )
}
