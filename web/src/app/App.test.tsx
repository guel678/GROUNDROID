import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('Groundroid application shell', () => {
  it('renders all research navigation destinations and semantic landmarks', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    for (const label of [
      'Dashboard',
      'Field Data',
      'Sampling Planner',
      'Rover Control',
      'Soil Maps',
      'Evaluation',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('marks the current route and exposes an accessible mobile menu control', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/field-data']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Field Data' })).toHaveAttribute('aria-current', 'page')
    const menu = screen.getByRole('button', { name: /open navigation/i })
    await user.click(menu)
    expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument()
  })
})
