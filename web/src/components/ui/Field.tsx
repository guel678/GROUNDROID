import type { ReactNode } from 'react'

export function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className={error ? 'form-field form-field--error' : 'form-field'}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <span className="form-field__message" id={`${id}-error`}>{error}</span> : hint ? <span className="form-field__hint">{hint}</span> : null}
    </div>
  )
}
