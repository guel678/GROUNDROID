import { describe, expect, it } from 'vitest'
import { demoAppState } from '../data/mockData'
import { createDemoRoverService } from './demoRoverService'

describe('demoRoverService', () => {
  it('rejects disconnected commands', async () => {
    const service = createDemoRoverService({ ...demoAppState.mission, connection: 'offline' })
    const result = await service.command('forward')
    expect(result.ok).toBe(false)
    expect(result.deliveredToHardware).toBe(false)
  })

  it('labels acknowledgements simulated and never hardware-delivered', async () => {
    const result = await createDemoRoverService(demoAppState.mission).command('left')
    expect(result).toMatchObject({ ok: true, provenance: 'demo', deliveredToHardware: false })
    expect(result.message).toMatch(/simulated/i)
  })

  it('enforces mission bounds and adds a disclaimer to emergency stop', async () => {
    const atEnd = { ...demoAppState.mission, currentWaypointIndex: demoAppState.mission.waypointIds.length - 1 }
    expect((await createDemoRoverService(atEnd).advance()).ok).toBe(false)
    expect((await createDemoRoverService(demoAppState.mission).emergencyStop()).message).toMatch(/simulator only.*not a hardware safety control/i)
  })
})
