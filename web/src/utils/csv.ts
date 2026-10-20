export interface CsvParseResult { headers: string[]; rows: Record<string, string>[]; errors: string[] }

function splitCsvLine(line: string): string[] {
  const cells: string[] = []; let value = ''; let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    if (character === '"') { if (quoted && line[index + 1] === '"') { value += '"'; index += 1 } else quoted = !quoted }
    else if (character === ',' && !quoted) { cells.push(value.trim()); value = '' }
    else value += character
  }
  cells.push(value.trim()); return cells
}

export function parseReferenceCsv(text: string): CsvParseResult {
  const clean = text.replace(/^\uFEFF/, '').trim(); if (!clean) return { headers: [], rows: [], errors: ['CSV file is empty.'] }
  const lines = clean.split(/\r?\n/).filter((line) => line.trim()); const headers = splitCsvLine(lines[0]).map((header) => header.trim().toLowerCase())
  const errors: string[] = []
  const rows = lines.slice(1).map((line, index) => { const cells = splitCsvLine(line); if (cells.length !== headers.length) errors.push(`Row ${index + 2} has ${cells.length} columns; expected ${headers.length}.`); return Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? ''])) })
  if (!rows.length) errors.push('CSV must contain at least one data row.')
  return { headers, rows, errors }
}
