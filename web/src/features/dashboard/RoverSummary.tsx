import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import type { RoverMission, SoilMeasurement } from '../../types/domain'

export function RoverSummary({ mission, latest }: { mission: RoverMission; latest?: SoilMeasurement }) {
  return <Card className="panel rover-summary"><div className="panel__header"><div><p className="panel__eyebrow">Live simulator</p><h2>Rover information</h2></div><ProvenanceBadge provenance={mission.provenance} /></div><dl className="detail-list"><div><dt>Connection</dt><dd><span className="online-dot" />{mission.connection}</dd></div><div><dt>Mode</dt><dd>{mission.mode}</dd></div><div><dt>Current waypoint</dt><dd>{mission.currentWaypointIndex + 1} of {mission.waypointIds.length}</dd></div><div><dt>Position (X, Y)</dt><dd>({mission.position.x} m, {mission.position.y} m)</dd></div><div><dt>Last reading</dt><dd>{latest ? <>Moisture {latest.moisture}%<br />Compaction {latest.compaction} MPa<br />NPK {latest.nitrogen}-{latest.phosphorus}-{latest.potassium}</> : 'No reading available'}</dd></div></dl><Link className="button-link button-link--secondary" to="/rover-control" aria-label="Open rover control">Open rover control</Link></Card>
}
