import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProvenanceBadge } from './ProvenanceBadge'

describe('ProvenanceBadge', () => {
  it.each([
    ['demo', 'Demo data'],
    ['imported', 'Imported data'],
    ['algorithm-generated', 'Algorithm-generated'],
    ['real', 'Real measurement'],
  ] as const)('explains %s provenance in text', (provenance, label) => {
    render(<ProvenanceBadge provenance={provenance} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it.each([
    ['demo', 'Demo data'],
    ['algorithm-generated', 'Algorithm-generated'],
  ] as const)('renders %s provenance without a data icon', (provenance, label) => {
    const { container } = render(<ProvenanceBadge provenance={provenance} />)

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
