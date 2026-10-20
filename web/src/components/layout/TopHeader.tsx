import { Menu, UserRound } from 'lucide-react'
import { useExperiment } from '../../state/ExperimentProvider'

interface TopHeaderProps {
  meta: { title: string; description: string }
  onOpenNavigation: () => void
}

export function TopHeader({ meta, onOpenNavigation }: TopHeaderProps) {
  const { state, dispatch } = useExperiment()
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
          <select value={state.activeExperimentId ?? ''} onChange={(event) => dispatch({ type: 'experiment/selected', experimentId: event.target.value })}>
            {state.experiments.map((experiment, index) => <option key={experiment.id} value={experiment.id}>Experiment {index + 1} · {experiment.name}</option>)}
          </select>
        </label>
        <span className="connection-pill"><span aria-hidden="true" /> Simulator online</span>
        <time dateTime="2025-04-27T10:24:00.000Z" title="Deterministic demonstration timestamp">Demo · Apr 27, 2025 10:24 AM</time>
        <button className="profile-button" type="button" aria-label="Open user menu">
          <UserRound size={18} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
