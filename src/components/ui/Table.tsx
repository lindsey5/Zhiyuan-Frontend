import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type PaginationState, type Row, type Table } from "@tanstack/react-table"
import { PaginationControls } from "./Pagination";
import { cn } from "../../utils/utils";
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
                className={`min-w-30 p-3 border-b border-[var(--border-panel)] text-${align}`}
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
                    className={`text-gold border-b p-3 font-bold sticky top-0 bg-panel z-5`}
                    style={{ textAlign: align }}
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
        <div className="min-h-0 flex-grow flex flex-col animate-pulse">
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
                                className="min-w-30 py-5 px-3 border-b border-[var(--border-panel)]"
                                style={{
                                backgroundColor:
                                    rowIdx % 2 === 0
                                    ? 'var(--bg-table-row-even)'
                                    : 'var(--bg-table-row-odd)',
                                }}
                            >
                                <div className="h-4 rounded w-full" style={{ backgroundColor: 'var(--bg-loading)' }}
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

export const TableCard = <T,>({ row } : { row: Row<T>}) => {
    return (
        <div key={row.id} className="border-b border-[var(--border-panel)] py-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {row.getVisibleCells().map((cell) => {
                const header = cell.column.columnDef.header;

                return (
                    <div
                        key={cell.id}
                        className="flex flex-col gap-1"
                    >
                    <span className="text-xs font-bold uppercase text-gold">
                        {header as string}
                    </span>
                    <span className="text-xs my-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                    </div>
                );
                })}
            </div>
        </div>
    )
}

type TableCardSkeletonProps = {
  cards?: number;
  fields?: number;
};

export const TableCardSkeleton: React.FC<TableCardSkeletonProps> = ({ cards = 6, fields = 6 }) => {
    return (
        <div className="md:hidden flex flex-col overflow-y-auto flex-grow gap-3 animate-pulse">
        {Array.from({ length: cards }).map((_, cardIdx) => (
            <div key={cardIdx} className="border-b border-[var(--border-panel)] py-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                {Array.from({ length: fields }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <div className="bg-loading p-3 rounded-md" />
                        <div className="bg-loading p-3 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
        ))}
        </div>
    );
};

type CustomTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];         
    totalPages?: number;
    pagination?: PaginationState;
    setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
    isLoading: boolean;
    showPagination: boolean;
    total?: number;
    noDataMessage?: string;
    className?: string
};

const CustomizedTable = <T,>({ 
    data,
    totalPages,
    pagination,
    setPagination,
    columns,
    isLoading, 
    showPagination, 
    total,
    className,
    noDataMessage = "No Data Available" } : CustomTableProps<T>
) => {
    const table = useReactTable({
        data,
        columns,
        pageCount: totalPages,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });
    const rows = table.getRowModel().rows;
    const cols = table.getAllColumns().length;

    return (
        <div className={cn(
            "min-h-0 flex-grow flex flex-col pb-5 px-5",
            className
        )}>
            {rows.length < 1 && !isLoading ? <div className="text-center my-20 text-muted font-bold">
                {noDataMessage}
            </div> :
            isLoading ? 
                <>
                    <TableSkeleton columns={cols}/>
                </>
            : 
                <>
                <div className="overflow-auto flex-grow relative">
                    <table className="w-full text-xs xl:text-sm">
                        <TableColumns table={table} />
                        <TableRows table={table} />
                    </table>
                </div>
                {showPagination && rows.length > 0 && <PaginationControls total={total || 0} table={table} />}
                </>
            }
        </div>
    );
};

export default CustomizedTable;