import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('uses roving focus and moves to the next tab with ArrowRight', () => {
    const onChange = vi.fn()

    render(
      <Tabs
        label="Evaluation view"
        items={[
          { id: 'sensor', label: 'Sensor accuracy' },
          { id: 'reconstruction', label: 'Reconstruction accuracy' },
          { id: 'efficiency', label: 'System efficiency' },
        ]}
        active="sensor"
        onChange={onChange}
      />,
    )

    const sensor = screen.getByRole('tab', { name: 'Sensor accuracy' })
    const reconstruction = screen.getByRole('tab', { name: 'Reconstruction accuracy' })

    expect(sensor).toHaveAttribute('tabindex', '0')
    expect(reconstruction).toHaveAttribute('tabindex', '-1')

    sensor.focus()
    fireEvent.keyDown(sensor, { key: 'ArrowRight' })

    expect(onChange).toHaveBeenCalledWith('reconstruction')
    expect(reconstruction).toHaveFocus()
  })

  it('links each tab to a labelled tab panel', () => {
    render(
      <Tabs
        label="Soil property"
        items={[{ id: 'moisture', label: 'Moisture' }]}
        active="moisture"
        onChange={() => undefined}
      />,
    )

    const tab = screen.getByRole('tab', { name: 'Moisture' })
    expect(tab).toHaveAttribute('aria-controls', 'soil-property-panel-moisture')
    expect(tab).toHaveAttribute('id', 'soil-property-tab-moisture')
  })
})
