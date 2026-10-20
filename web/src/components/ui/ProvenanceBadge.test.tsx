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
})
