import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

export interface TabItem<T extends string> { id: T; label: string; icon?: ReactNode }

export function Tabs<T extends string>({ items, active, onChange, label }: { items: TabItem<T>[]; active: T; onChange: (id: T) => void; label: string }) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const idPrefix = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const selectAt = (index: number) => {
    const item = items[index]
    const tab = tabRefs.current[index]
    if (!item || !tab) return
    onChange(item.id)
    tab.focus()
    tab.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % items.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = items.length - 1
    if (nextIndex === undefined) return
    event.preventDefault()
    selectAt(nextIndex)
  }

  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(element) => { tabRefs.current[index] = element }}
          id={`${idPrefix}-tab-${item.id}`}
          type="button"
          role="tab"
          aria-controls={`${idPrefix}-panel-${item.id}`}
          aria-selected={active === item.id}
          tabIndex={active === item.id ? 0 : -1}
          className={active === item.id ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
          onClick={() => onChange(item.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {item.icon}{item.label}
        </button>
      ))}
    </div>
  )
}
