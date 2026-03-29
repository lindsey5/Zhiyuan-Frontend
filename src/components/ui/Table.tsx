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
                className={`py-3 lg:py-5 px-1 lg:px-3 border-b border-[var(--border-panel)] text-${align}`}
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
            {table.getRowModel().rows.map((row, i) => <TableRow key={i} row={row}/>)}
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
                    className={`text-gold border-b p-5 font-bold sticky top-0 bg-panel text-${align} z-1`}
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

type TableSkeletonProps = {
  columns: number;
  rows?: number;
};

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows = 10 }) => {
    return (
        <div className="min-h-0 flex-grow flex flex-col pb-5 px-5 animate-pulse">
            <div className="overflow-auto flex-grow">
                <table className="w-full text-sm border-collapse">
                    {/* Table Head */}
                    <thead>
                        <tr>
                        {Array.from({ length: columns }).map((_, idx) => (
                            <th
                                key={idx}
                                className="h-6 pb-5 border-b border-[var(--border-panel)]"
                            >
                            <div
                                className="h-4 rounded w-3/4 mx-auto"
                                style={{ backgroundColor: 'var(--color-input-ui)' }}
                            ></div>
                            </th>
                        ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr key={rowIdx} className="transition-colors duration-200">
                            {Array.from({ length: columns }).map((_, colIdx) => (
                            <td
                                key={colIdx}
                                className="py-5 px-3 border-b border-[var(--border-panel)]"
                                style={{
                                backgroundColor:
                                    rowIdx % 2 === 0
                                    ? 'var(--bg-table-row-even)'
                                    : 'var(--bg-table-row-odd)',
                                }}
                            >
                                <div
                                className="h-4 rounded w-full"
                                style={{ backgroundColor: 'var(--bg-hover)' }}
                                ></div>
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CustomizedTable = <T,>({ table, showPagination, noDataMessage = "No Data Available" }: { table: Table<T>, showPagination: boolean, noDataMessage: string}) => {
    const rows = table.getRowModel().rows;

    return (
        <div className="min-h-0 flex-grow flex flex-col pb-5 px-5">
            <div className="overflow-auto flex-grow relative">
                <table className="w-full text-xs lg:text-sm">
                    <TableColumns table={table} />
                    <TableRows table={table} />
                </table>
                {rows.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-1/2 text-muted font-bold">
                    {noDataMessage}
                </div>}
            </div>
            {showPagination && rows.length > 0 && <PaginationControls table={table} />}
        </div>
    );
};

export default CustomizedTable;