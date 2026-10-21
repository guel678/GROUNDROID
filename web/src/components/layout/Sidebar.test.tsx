import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('shows when the SQLite demo database is connected', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(
      JSON.stringify({ status: 'ok', database: 'sqlite' }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )))
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    expect(await screen.findByText('SQLite connected')).toBeInTheDocument()
  })

  it('shows an offline state when the demo API cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Demo database offline')).toBeInTheDocument()
  })

  it('uses the Groundroid mascot artwork as the brand mark', () => {
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    expect(document.querySelector('.brand-mark img')).toHaveAttribute('src', '/logo.png')
    expect(document.querySelector('.brand-mark img')).toHaveAttribute('alt', '')
  })

  it('does not label the interface as a demo workspace', () => {
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.queryByText('Demo workspace')).not.toBeInTheDocument()
  })

  it('positions one moving indicator behind the active route', () => {
    const rectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      if (this.classList.contains('sidebar__nav')) {
        return { top: 20, height: 296 } as DOMRect
      }

      if (this.getAttribute('aria-current') === 'page') {
        return { top: 116, height: 46 } as DOMRect
      }

      return { top: 0, height: 0 } as DOMRect
    })

    render(
      <MemoryRouter initialEntries={['/field-data']}>
        <Sidebar mobileOpen={false} onNavigate={vi.fn()} />
      </MemoryRouter>,
    )

    const indicator = screen.getByTestId('sidebar-active-indicator')
    expect(indicator).toHaveAttribute('aria-hidden', 'true')
    expect(indicator).toHaveStyle({
      height: '46px',
      transform: 'translate3d(0, 96px, 0)',
    })

    rectSpy.mockRestore()
  })
})
