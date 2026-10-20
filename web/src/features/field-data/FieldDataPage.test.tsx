import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ExperimentProvider } from '../../state/ExperimentProvider'
import { FieldDataPage } from './FieldDataPage'

describe('FieldDataPage', () => {
  it('shows editable field configuration, safe upload guidance, and preview data', () => {
    render(<MemoryRouter><ExperimentProvider><FieldDataPage /></ExperimentProvider></MemoryRouter>)
    expect(screen.getByLabelText(/experiment name/i)).toHaveValue('Test Field - April 2025')
    expect(screen.getByText(/drag and drop your csv/i)).toBeInTheDocument()
    expect(screen.getByText(/required columns/i)).toBeInTheDocument()
    expect(screen.getByRole('table', { name: /dataset preview/i })).toBeInTheDocument()
    expect(screen.getAllByText('Demo data').length).toBeGreaterThan(0)
  })
})
