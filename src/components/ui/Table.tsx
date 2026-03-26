import { flexRender, type Row, type Table } from "@tanstack/react-table"

type TableRowProps<T> = {
    row: Row<T>
}

const TableRow = <T,>({ row }: TableRowProps<T>) => {
    return (
        <tr>
        {row.getVisibleCells().map(cell => {
            const align = (cell.column.columnDef.meta as any)?.align || 'left';
            return (
            <td
                key={cell.id}
                className={`py-5 px-3 border-b border-[var(--border-panel)] text-${align}`}
            >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
            );
        })}
        </tr>
    );
};

const TableRows = <T, > ({ table } : { table : Table<T>}) => {
    return (
        <tbody>
            {table.getRowModel().rows.map((row) => <TableRow row={row}/>)}
        </tbody>
    )
}

const TableColumns = <T,>({ table }: { table: Table<T> }) => {
    return (
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
                const align = (header.column.columnDef.meta as any)?.align || 'left';
                return (
                <th
                    key={header.id}
                    className={`text-gold border-b p-5 font-bold sticky top-0 bg-panel text-${align}`}
                >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
                );
            })}
            </tr>
        ))}
        </thead>
    );
};

const CustomizedTable = <T,> ({ table } : { table : Table<T>}) => {
    return (
        <div className="min-h-0 flex-grow overflow-auto">
            <table className="w-full text-sm">
                <TableColumns table={table}/>
                <TableRows table={table}/>
            </table>
        </div>
    )
}

export default CustomizedTable