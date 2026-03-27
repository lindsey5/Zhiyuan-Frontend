import { flexRender, type Row, type Table } from "@tanstack/react-table"
import { PaginationControls } from "./Pagination";

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

const CustomizedTable = <T,>({ table, showPagination }: { table: Table<T>, showPagination: boolean }) => {
    return (
        <div className="min-h-0 flex-grow flex flex-col pb-5 px-5">
            <div className="overflow-auto flex-grow">
                    <table className="w-full text-sm o">
                    <TableColumns table={table} />
                    <TableRows table={table} />
                </table>
            </div>
            {showPagination && <PaginationControls table={table} />}
        </div>
    );
    };

export default CustomizedTable;