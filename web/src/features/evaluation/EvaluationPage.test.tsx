import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { EvaluationPage } from './EvaluationPage'

vi.mock('../../components/charts/Plot', () => ({ Plot: ({ ariaLabel }: { ariaLabel: string }) => <div role="img" aria-label={ariaLabel} /> }))

describe('EvaluationPage', () => {
  it('shows simulated metrics, charts, comparison data, and guarded exports', () => {
    render(<MemoryRouter><ExperimentProvider><EvaluationPage /></ExperimentProvider></MemoryRouter>)
    expect(screen.getByRole('img', { name: /sensor accuracy scatter/i })).toBeInTheDocument()
    expect(screen.getByRole('table', { name: /error metrics/i })).toBeInTheDocument()
    expect(screen.getByText('0.94')).toBeInTheDocument()
    expect(screen.getByText('Demo data')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /export evaluation csv/i })).toBeEnabled()
  })
})
