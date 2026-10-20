import type { ReactNode } from 'react'

export interface DataColumn<T> { key: string; header: string; render: (row: T, index: number) => ReactNode; align?: 'left' | 'right' }

export function DataTable<T>({ columns, rows, rowKey, caption }: { columns: DataColumn<T>[]; rows: T[]; rowKey: (row: T, index: number) => string; caption: string }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{columns.map((column) => <th key={column.key} scope="col" className={column.align === 'right' ? 'data-table__numeric' : ''}>{column.header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={rowKey(row, index)}>{columns.map((column) => <td key={column.key} className={column.align === 'right' ? 'data-table__numeric' : ''}>{column.render(row, index)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
