import { useMemo, useState } from 'react'
import { FieldPlot } from '../../components/field/FieldPlot'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { ProvenanceBadge } from '../../components/ui/ProvenanceBadge'
import { createDemoRoverService } from '../../services/demoRoverService'
import type { RoverCommand, RoverService } from '../../services/roverService'
import { useExperiment } from '../../state/ExperimentProvider'
import { selectActiveExperiment, selectLatestReading, selectMissionProgress } from '../../state/selectors'
import type { MissionLogEntry } from '../../types/domain'
import type { RoverCommandAcknowledgement } from '../../types/services'
import { ManualControls } from './ManualControls'
import { MissionLog } from './MissionLog'
import { RoverStatus } from './RoverStatus'

export function RoverControlPage() {
  const { state, dispatch } = useExperiment()
  const experiment = selectActiveExperiment(state)
  const latest = selectLatestReading(state)
  const service: RoverService = useMemo(
    () => createDemoRoverService(state.mission, experiment?.samplingPoints),
    [state.mission, experiment?.samplingPoints],
  )
  const [messages, setMessages] = useState<MissionLogEntry[]>(state.missionLog)
  const [notice, setNotice] = useState('')

  if (!experiment) return <EmptyState title="No active experiment" description="Select an experiment before opening rover controls." />

  function record(message: string, level: MissionLogEntry['level'] = 'info') {
    setNotice(message)
    setMessages((items) => [{ id: `ui-${items.length}`, timestamp: new Date().toISOString(), message, level, provenance: 'demo' }, ...items])
  }
  function applyResponse(response: RoverCommandAcknowledgement) {
    if (response.data) dispatch({ type: 'mission/replaced', mission: response.data })
    record(response.message, response.ok ? 'info' : 'warning')
  }
  async function command(value: RoverCommand) { applyResponse(await service.command(value)) }
  async function advance() { applyResponse(await service.advance()) }
  async function emergency() {
    const response = await service.emergencyStop()
    if (response.data) dispatch({ type: 'mission/replaced', mission: response.data })
    record(response.message, 'critical')
  }

  return <div className="rover-page page-stack">
    <div className="safety-banner"><ProvenanceBadge provenance="demo" /><strong>Simulator only</strong><span>Controls do not connect to or stop physical hardware.</span></div>
    <RoverStatus mission={state.mission} />
    <section className="rover-main-grid">
      <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Waypoint route</p><h2>Field navigation</h2></div></div><FieldPlot width={experiment.width} length={experiment.length} points={experiment.samplingPoints} route={experiment.samplingPoints} rover={state.mission.position} /></Card>
      <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Demo transport</p><h2>Manual controls</h2></div></div><ManualControls status={state.mission.status} canReturnToStart={state.mission.capabilities.returnToStart} onCommand={(value) => void command(value)} onAdvance={() => void advance()} onStatus={(status) => dispatch({ type: 'mission/statusChanged', status })} onEmergency={() => void emergency()} />{notice ? <p className="command-notice" role="status">{notice}</p> : null}</Card>
    </section>
    <section className="rover-lower-grid">
      <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Most recent point</p><h2>Latest measurement</h2></div></div>{latest ? <div className="reading-grid reading-grid--compact"><div><span>Moisture</span><strong>{latest.moisture}%</strong></div><div><span>Compaction</span><strong>{latest.compaction} MPa</strong></div><div><span>NPK</span><strong>{latest.nitrogen}-{latest.phosphorus}-{latest.potassium}</strong></div></div> : null}<ProgressBar value={selectMissionProgress(state)} label={`${state.mission.currentWaypointIndex + 1} of ${state.mission.waypointIds.length} waypoints`} /></Card>
      <Card className="panel"><div className="panel__header"><div><p className="panel__eyebrow">Audit trail</p><h2>Command log</h2></div></div><MissionLog entries={messages} /></Card>
    </section>
  </div>
}
