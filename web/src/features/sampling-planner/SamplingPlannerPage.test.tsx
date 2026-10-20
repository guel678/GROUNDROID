import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { SamplingPlannerPage } from './SamplingPlannerPage'

describe('SamplingPlannerPage', () => {
  it('presents the five-stage simulated planning workflow', () => {
    render(<MemoryRouter><ExperimentProvider><SamplingPlannerPage /></ExperimentProvider></MemoryRouter>)
    for (const label of ['Reference data', 'SVD / POD', 'QR pivoting', 'Review locations', 'Prepare mission']) expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /run simulated planner/i })).toBeEnabled()
    expect(screen.getAllByText(/illustrative selection/i).length).toBeGreaterThan(0)
  })
})
