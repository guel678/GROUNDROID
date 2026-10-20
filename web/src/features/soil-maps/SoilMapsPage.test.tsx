import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { SoilMapsPage } from './SoilMapsPage'

vi.mock('../../components/charts/Plot', () => ({ Plot: ({ ariaLabel }: { ariaLabel: string }) => <div role="img" aria-label={ariaLabel} /> }))

describe('SoilMapsPage', () => {
  it('switches properties with correct units and preserves provenance', () => {
    render(<MemoryRouter><ExperimentProvider><SoilMapsPage /></ExperimentProvider></MemoryRouter>)
    expect(screen.getByRole('img', { name: /moisture heatmap/i })).toBeInTheDocument()
    expect(screen.getAllByText('%').length).toBeGreaterThan(0)
    expect(screen.getByText('Demo data')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: 'Nitrogen' }))
    expect(screen.getByRole('img', { name: /nitrogen heatmap/i })).toBeInTheDocument()
    expect(screen.getAllByText('mg/kg').length).toBeGreaterThan(0)
    expect(screen.getByRole('checkbox', { name: /show sampling points/i })).toBeChecked()
  })
})
