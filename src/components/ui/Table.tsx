import { flexRender, type Row, type Table } from "@tanstack/react-table"

type TableRowProps<T> = {
    row: Row<T>
}

const TableRow = <T,>({ row }: TableRowProps<T>) => {
    return (
        <tr>
            {row.getVisibleCells().map(cell => (
                <td
                    key={cell.id}
                    className="py-5 px-3 border-b border-[var(--border-panel)]"
                >
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </td>
            ))}
        </tr>
    )
}

const TableRows = <T, > ({ table } : { table : Table<T>}) => {
    return (
        <tbody>
            {table.getRowModel().rows.map((row) => <TableRow row={row}/>)}
        </tbody>
    )
}

const TableColumns = <T, > ({ table } : { table : Table<T>}) => {
    return (
        <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="text-left text-gold border-b p-5 font-bold sticky top-0 bg-panel">
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )
}

const CustomizedTable = <T,> ({ table } : { table : Table<T>}) => {
    return (
        <div className="min-h-0 flex-grow overflow-y-auto">
            <table className="w-full text-sm">
                <TableColumns table={table}/>
                <TableRows table={table}/>
            </table>
        </div>
    )
}

export default CustomizedTable