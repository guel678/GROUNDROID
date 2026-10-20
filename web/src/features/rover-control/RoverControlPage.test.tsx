import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { RoverControlPage } from './RoverControlPage'

describe('RoverControlPage', () => {
  it('labels the simulator and presents safe mission controls', () => {
    render(<MemoryRouter><ExperimentProvider><RoverControlPage /></ExperimentProvider></MemoryRouter>)
    expect(screen.getByText(/simulator only/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start simulated mission/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /emergency stop simulator/i })).toBeEnabled()
    expect(screen.getAllByText(/4 of 12/i).length).toBeGreaterThan(0)
  })
})
