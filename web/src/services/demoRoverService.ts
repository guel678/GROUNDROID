import type { RoverMission } from '../types/domain'
import type { RoverCommandAcknowledgement } from '../types/services'
import type { RoverCommand, RoverService } from './roverService'

const result = (ok: boolean, mission: RoverMission, message: string): RoverCommandAcknowledgement => ({ ok, data: mission, message, provenance: 'demo', deliveredToHardware: false })

export function createDemoRoverService(initial: RoverMission): RoverService {
  let mission = { ...initial }
  return {
    snapshot: () => mission,
    async command(command: RoverCommand) { if (mission.connection === 'offline') return result(false, mission, 'Command rejected: simulator is disconnected.'); if (mission.status === 'stopped' && command !== 'stop') return result(false, mission, 'Command rejected: reset the simulated mission after a stop.'); return result(true, mission, `Simulated ${command} command acknowledged; no hardware command was delivered.`) },
    async advance() { if (mission.connection === 'offline') return result(false, mission, 'Mission advance rejected: simulator is disconnected.'); if (mission.currentWaypointIndex >= mission.waypointIds.length - 1) return result(false, mission, 'Mission is already at its final waypoint.'); mission = { ...mission, currentWaypointIndex: mission.currentWaypointIndex + 1, status: 'running' }; return result(true, mission, 'Simulated mission advanced by one waypoint.') },
    async emergencyStop() { mission = { ...mission, status: 'stopped' }; return result(true, mission, 'Simulator only: stopped the demo mission. This is not a hardware safety control.') },
  }
}
