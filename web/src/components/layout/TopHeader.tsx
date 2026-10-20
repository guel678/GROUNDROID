import { Menu, UserRound } from 'lucide-react'

interface TopHeaderProps {
  meta: { title: string; description: string }
  onOpenNavigation: () => void
}

const timestamp = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date())

export function TopHeader({ meta, onOpenNavigation }: TopHeaderProps) {
  return (
    <header className="top-header">
      <button
        type="button"
        className="top-header__menu"
        aria-label="Open navigation"
        onClick={onOpenNavigation}
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <div className="top-header__identity">
        <h1>{meta.title}</h1>
        <p>{meta.description}</p>
      </div>
      <div className="top-header__tools">
        <label className="experiment-select">
          <span className="sr-only">Current experiment</span>
          <select defaultValue="test-field">
            <option value="test-field">Experiment 1 · Test Field</option>
          </select>
        </label>
        <span className="connection-pill"><span aria-hidden="true" /> Simulator online</span>
        <time dateTime={new Date().toISOString()}>{timestamp}</time>
        <button className="profile-button" type="button" aria-label="Open user menu">
          <UserRound size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
