import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('advances the simulated mission and updates progress', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><ExperimentProvider><RoverControlPage /></ExperimentProvider></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: /start simulated mission/i }))

    expect(screen.getAllByText(/5 of 12/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/advanced by one waypoint/i).length).toBeGreaterThan(0)
  })
})
