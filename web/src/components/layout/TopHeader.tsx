import { Menu } from 'lucide-react'
import type { RefObject } from 'react'
import { useExperiment } from '../../state/ExperimentProvider'

interface TopHeaderProps {
  menuButtonRef: RefObject<HTMLButtonElement | null>
  meta: { title: string; description: string }
  navigationOpen: boolean
  onOpenNavigation: () => void
}

export function TopHeader({ menuButtonRef, meta, navigationOpen, onOpenNavigation }: TopHeaderProps) {
  const { state, dispatch } = useExperiment()
  return (
    <header className="top-header">
      <button
        ref={menuButtonRef}
        type="button"
        className="top-header__menu"
        aria-label="Open navigation"
        aria-controls="primary-sidebar"
        aria-expanded={navigationOpen}
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
      </div>
    </header>
  )
}
