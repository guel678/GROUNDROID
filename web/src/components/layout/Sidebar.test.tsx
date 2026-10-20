import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('does not label the interface as a demo workspace', () => {
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.queryByText('Demo workspace')).not.toBeInTheDocument()
  })
})
