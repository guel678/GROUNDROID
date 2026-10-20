const steps = [['Reference data', 'Load dataset'], ['SVD / POD', 'Illustrative patterns'], ['QR pivoting', 'Select locations'], ['Review locations', 'Verify field points'], ['Prepare mission', 'Send to simulator']]

export function WorkflowStepper() { return <ol className="workflow-stepper">{steps.map(([label, detail], index) => <li key={label} className={index === 0 ? 'workflow-stepper__active' : ''}><span>{index + 1}</span><div><strong>{label}</strong><small>{detail}</small></div></li>)}</ol> }
