import { CheckCircle2, FileUp } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { parseReferenceCsv } from '../../utils/csv'
import { validateReferenceRows } from '../../utils/datasetValidation'
import type { SoilMeasurement } from '../../types/domain'

export function CsvUpload({ onValid }: { onValid: (measurements: SoilMeasurement[], fileName: string) => void }) {
  const input = useRef<HTMLInputElement>(null); const [errors, setErrors] = useState<string[]>([]); const [success, setSuccess] = useState('')
  async function process(file?: File) { if (!file) return; if (file.size > 5_000_000) { setErrors(['File exceeds the 5 MB safety limit.']); return } const parsed = parseReferenceCsv(await file.text()); const validated = validateReferenceRows(parsed.rows); const allErrors = [...parsed.errors, ...validated.errors]; setErrors(allErrors); setSuccess(''); if (!allErrors.length) { onValid(validated.measurements, file.name); setSuccess(`${validated.measurements.length} records validated and imported.`) } }
  return <div><div className="upload-zone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void process(event.dataTransfer.files[0]) }}><FileUp size={30} aria-hidden="true" /><strong>Drag and drop your CSV file here</strong><span>Supports coordinates and soil measurements · maximum 5 MB</span><input ref={input} className="sr-only" type="file" accept=".csv,text/csv" aria-label="Choose CSV dataset" onChange={(event) => void process(event.target.files?.[0])} /><Button onClick={() => input.current?.click()}>Choose file</Button></div>{success ? <div className="validation-banner validation-banner--success" role="status"><CheckCircle2 size={16} />{success}</div> : null}{errors.length ? <div className="validation-banner validation-banner--error" role="alert"><strong>Import blocked</strong><ul>{errors.slice(0, 6).map((error) => <li key={error}>{error}</li>)}</ul></div> : null}</div>
}
