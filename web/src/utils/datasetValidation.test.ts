import { describe, expect, it } from 'vitest'
import { parseReferenceCsv } from './csv'
import { validateReferenceRows } from './datasetValidation'

describe('reference dataset validation', () => {
  it('accepts BOM, whitespace, and N/P/K columns', () => {
    const parsed = parseReferenceCsv('\uFEFFid, x , y , moisture,compaction,n,p,k\nP1, 2, 4,22.1,1.3,45,18,20')
    const result = validateReferenceRows(parsed.rows)
    expect(parsed.errors).toEqual([])
    expect(result.valid).toBe(true)
    expect(result.measurements[0]).toMatchObject({ id: 'P1', x: 2, y: 4, nitrogen: 45, phosphorus: 18, potassium: 20, provenance: 'imported' })
  })

  it.each([
    ['missing coordinates', 'id,y,moisture,compaction,n,p,k\nP1,4,22,1.2,1,2,3', /x/i],
    ['absent property', 'id,x,y,moisture,compaction,n,p\nP1,2,4,22,1.2,1,2', /potassium|k/i],
    ['blank cell', 'id,x,y,moisture,compaction,n,p,k\nP1,2,4,,1.2,1,2,3', /row 2.*moisture/i],
    ['non-numeric cell', 'id,x,y,moisture,compaction,n,p,k\nP1,2,4,bad,1.2,1,2,3', /row 2.*moisture/i],
    ['duplicate id', 'id,x,y,moisture,compaction,n,p,k\nP1,2,4,22,1.2,1,2,3\nP1,3,5,23,1.1,2,3,4', /duplicate/i],
    ['partial row', 'id,x,y,moisture,compaction,n,p,k\nP1,2,4,22,1.2', /row 2/i],
  ])('rejects %s', (_name, csv, expected) => {
    const parsed = parseReferenceCsv(csv)
    const result = validateReferenceRows(parsed.rows)
    expect([...parsed.errors, ...result.errors].join(' ')).toMatch(expected)
    expect(result.valid).toBe(false)
  })
})
