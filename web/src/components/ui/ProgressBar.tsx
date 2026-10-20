export function ProgressBar({ value, label }: { value: number; label: string }) {
  const bounded = Math.min(100, Math.max(0, value))
  return (
    <div className="progress-block">
      <div className="progress-block__label"><span>{label}</span><strong>{bounded}%</strong></div>
      <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={bounded}>
        <span style={{ width: `${bounded}%` }} />
      </div>
    </div>
  )
}
