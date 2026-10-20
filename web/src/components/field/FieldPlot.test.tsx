import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { demoSamplingPoints } from '../../data/mockData'
import { FieldPlot } from './FieldPlot'

describe('FieldPlot', () => {
  it('renders accessible marker semantics, route, rover, and proportional axes', () => {
    render(
      <FieldPlot
        width={20}
        length={20}
        points={demoSamplingPoints.slice(0, 3)}
        route={demoSamplingPoints.slice(0, 3)}
        rover={{ x: 8.4, y: 6.2 }}
        ariaLabel="Test field sampling map"
      />,
    )

    expect(screen.getByRole('img', { name: 'Test field sampling map' })).toBeInTheDocument()
    expect(screen.getByLabelText(/SP-01.*completed/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/SP-03.*completed/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rover.*8.4.*6.2/i)).toBeInTheDocument()
    expect(screen.getByText('Route')).toBeInTheDocument()
    expect(screen.getByText('X (m)')).toBeInTheDocument()
    expect(screen.getByText('Y (m)')).toBeInTheDocument()
  })

  it('supports selection and exposes a reset view control', () => {
    const onPointSelect = vi.fn()
    render(<FieldPlot width={20} length={20} points={demoSamplingPoints.slice(0, 1)} onPointSelect={onPointSelect} />)

    fireEvent.click(screen.getByLabelText(/SP-01.*completed/i))
    expect(onPointSelect).toHaveBeenCalledWith(demoSamplingPoints[0])
    expect(screen.getByRole('button', { name: /reset field view/i })).toBeEnabled()
  })

  it('shows an actionable empty state without inventing markers', () => {
    render(<FieldPlot width={20} length={20} points={[]} />)
    expect(screen.getByText(/no sampling locations available/i)).toBeInTheDocument()
  })
})
