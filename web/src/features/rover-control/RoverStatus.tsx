import { BatteryMedium, MapPin, Radio, Route } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import type { RoverMission } from '../../types/domain'

export function RoverStatus({ mission }: { mission: RoverMission }) { const items = [[Radio, 'Connection', mission.connection], [Route, 'Mode', mission.mode], [MapPin, 'Current waypoint', `${mission.currentWaypointIndex + 1} of ${mission.waypointIds.length}`], [BatteryMedium, 'Battery', mission.capabilities.batteryTelemetry ? '76% demo' : 'Unavailable']] as const; return <section className="rover-status-grid" aria-label="Rover status">{items.map(([Icon, label, value]) => <Card className="rover-status-card" key={label}><Icon size={20} /><span>{label}</span><strong>{value}</strong></Card>)}</section> }
