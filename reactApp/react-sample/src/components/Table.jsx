import React, { useEffect, useState } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';

const filter = (row, columnId, value) => {
  return String(row.getValue(columnId)).indexOf(value) !== -1;
}

/** 検索エリアのコンポーネント */
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

const Table = React.forwardRef(({
  columns,
  rows,
  ...otherProps
}, ref) => {

  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    columns,
    data: rows,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="w-100">
      <div className="mb-2 w-100" style={{ paddingLeft: 1, paddingRight: 1 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="w-100 p-2 font-lg shadow border border-block"
          placeholder="検索"
        />
      </div>

      <BootstrapTable ref={ref} {...otherProps}>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => {
                    return (
                      <th key={header.id}>
                        {
                          header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())
                        }
                      </th>
                    )
                  })
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </BootstrapTable>
    </div>
  )
})

export default Table;