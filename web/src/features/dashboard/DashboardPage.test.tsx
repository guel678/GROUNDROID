import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { demoAppState } from '../../data/mockData'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { DashboardPage } from './DashboardPage'

function renderPage(initialState = demoAppState) {
  return render(<MemoryRouter><ExperimentProvider initialState={initialState}><DashboardPage /></ExperimentProvider></MemoryRouter>)
}

describe('DashboardPage', () => {
  it('summarizes the deterministic demo field and exposes workflow links', () => {
    renderPage()
    expect(screen.getByText('400 m²')).toBeInTheDocument()
    expect(screen.getByText('20 m × 20 m')).toBeInTheDocument()
    expect(screen.getByText('8 / 12')).toBeInTheDocument()
    expect(screen.getAllByText('Demo data').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /open sampling planner/i })).toHaveAttribute('href', '/sampling-planner')
    expect(screen.getByRole('link', { name: /open rover control/i })).toHaveAttribute('href', '/rover-control')
  })

  it('shows a useful empty state when no experiment is selected', () => {
    renderPage({ ...demoAppState, activeExperimentId: null })
    expect(screen.getByText(/no active experiment/i)).toBeInTheDocument()
  })
})
