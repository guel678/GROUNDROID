import type { RoverMission, SamplingPoint } from '../types/domain'
import type { RoverCommandAcknowledgement } from '../types/services'
import type { RoverCommand, RoverService } from './roverService'

const result = (ok: boolean, mission: RoverMission, message: string): RoverCommandAcknowledgement => ({ ok, data: mission, message, provenance: 'demo', deliveredToHardware: false })
const offsets: Partial<Record<RoverCommand, { x: number; y: number }>> = {
  forward: { x: 0, y: 1 },
  backward: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export function createDemoRoverService(initial: RoverMission, waypoints: SamplingPoint[] = []): RoverService {
  let mission = { ...initial }
  return {
    snapshot: () => mission,
    async command(command: RoverCommand) {
      if (mission.connection === 'offline') return result(false, mission, 'Command rejected: simulator is disconnected.')
      if (mission.status === 'stopped' && command !== 'stop' && command !== 'return-to-start') return result(false, mission, 'Command rejected: reset the simulated mission after a stop.')
      const offset = offsets[command]
      if (command === 'return-to-start') {
        const start = waypoints[0]
        mission = { ...mission, currentWaypointIndex: 0, position: start ? { x: start.x, y: start.y } : { x: 0, y: 0 }, status: 'idle', lastCommunicationAt: new Date().toISOString() }
      } else if (offset) {
        mission = { ...mission, mode: 'manual', position: { x: Math.max(0, mission.position.x + offset.x), y: Math.max(0, mission.position.y + offset.y) }, lastCommunicationAt: new Date().toISOString() }
      } else if (command === 'stop') {
        mission = { ...mission, status: 'paused', lastCommunicationAt: new Date().toISOString() }
      } else {
        mission = { ...mission, lastCommunicationAt: new Date().toISOString() }
      }
      return result(true, mission, `Simulated ${command} command acknowledged; no hardware command was delivered.`)
    },
    async advance() {
      if (mission.connection === 'offline') return result(false, mission, 'Mission advance rejected: simulator is disconnected.')
      if (mission.currentWaypointIndex >= mission.waypointIds.length - 1) return result(false, mission, 'Mission is already at its final waypoint.')
      const currentWaypointIndex = mission.currentWaypointIndex + 1
      const target = waypoints[currentWaypointIndex]
      mission = { ...mission, currentWaypointIndex, position: target ? { x: target.x, y: target.y } : mission.position, status: 'running', mode: 'autonomous', lastCommunicationAt: new Date().toISOString() }
      return result(true, mission, 'Simulated mission advanced by one waypoint.')
    },
    async emergencyStop() {
      mission = { ...mission, status: 'stopped', lastCommunicationAt: new Date().toISOString() }
      return result(true, mission, 'Simulator only: stopped the demo mission. This is not a hardware safety control.')
    },
  }
}
