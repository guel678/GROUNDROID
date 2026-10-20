import { createContext, type Dispatch, type ReactNode, useContext, useMemo, useReducer } from 'react'

import { demoAppState } from '../data/mockData'
import type { ExperimentState } from '../types/domain'
import { experimentReducer, type ExperimentAction } from './experimentReducer'

interface ExperimentContextValue {
  state: ExperimentState
  dispatch: Dispatch<ExperimentAction>
}

const ExperimentContext = createContext<ExperimentContextValue | null>(null)

export function ExperimentProvider({ children, initialState = demoAppState }: { children: ReactNode; initialState?: ExperimentState }) {
  const [state, dispatch] = useReducer(experimentReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>
}

export function useExperiment(): ExperimentContextValue {
  const context = useContext(ExperimentContext)
  if (!context) throw new Error('useExperiment must be used within ExperimentProvider')
  return context
}
