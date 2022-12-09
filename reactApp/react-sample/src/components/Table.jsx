import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

export const Table = React.forwardRef(({
  columns,
  rows,
  ...otherProps
}, ref) => {

  return (
    <BootstrapTable ref={ref} {...otherProps}>
      {
        columns && (
          <thead>
            <tr>
              {columns.map((column, i) => <th key={i}>{column}</th>)}
            </tr>
          </thead>
        )
      }
      {
        rows && (
          <tbody>
            {
              rows.map(row => (
                <tr key={row[0]}>
                  {row.map((column, i) => <td key={i}>{column}</td>)}
                </tr>
              ))
            }
          </tbody>
        )
      }
    </BootstrapTable>
  )
})