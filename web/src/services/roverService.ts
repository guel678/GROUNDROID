import type { RoverMission } from '../types/domain'
import type { RoverCommandAcknowledgement } from '../types/services'

export type RoverCommand = 'forward' | 'backward' | 'left' | 'right' | 'stop' | 'measure' | 'return-to-start'
export interface RoverService { command(command: RoverCommand): Promise<RoverCommandAcknowledgement>; advance(): Promise<RoverCommandAcknowledgement>; emergencyStop(): Promise<RoverCommandAcknowledgement>; snapshot(): RoverMission }
