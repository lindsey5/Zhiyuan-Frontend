import { type Table } from "@tanstack/react-table";
import { cn } from "../../utils/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    tooltip?: string;
    children: React.ReactNode;
    className?: string;
}

export const PaginationButton = ({
    onClick,
    disabled = false,
    tooltip,
    children,
    className = "",
}: PaginationButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "disabled:opacity-50 cursor-pointer relative group",
                className
            )}
        >
            {tooltip && (
                <span className="pointer-events-none select-none absolute -top-full left-1/2 transform -translate-x-1/2 ml-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition">
                    {tooltip}
                </span>
            )}
            {children}
        </button>
    );
};

interface PaginationControlsProps<T> {
    table: Table<T>;
    total: number;
}

export const PaginationControls = <T,>({ table, total }: PaginationControlsProps<T>) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const pageCount = table.getPageCount();

    const delta = 2;

    const getPageNumbers = () => {
        const range: (number | string)[] = [];
        const left = Math.max(0, pageIndex - delta);
        const right = Math.min(pageCount - 1, pageIndex + delta);

        for (let i = 0; i < pageCount; i++) {
            if (i === 0 || i === pageCount - 1 || (i >= left && i <= right)) {
                range.push(i);
            } else if (range[range.length - 1] !== "...") {
                range.push("...");
            }
        }

        return range;
    };

    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, total);

    return (
        <div className="flex items-center justify-between gap-3 mt-10 lg:text-sm xxl:text-md text-primary flex-wrap">
            <div className="text-sm">
                Showing {startRow} - {endRow} from {total}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center justify-end gap-2 text-primary flex-wrap">
                {/* First & Prev */}
                <PaginationButton
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    tooltip="First"
                >
                    <ChevronsLeft className="hover:text-gold"/>
                </PaginationButton>
                <PaginationButton
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    tooltip="Prev"
                >
                    <ChevronLeft className="hover:text-gold"/>
                </PaginationButton>

                {/* Page numbers */}
                {getPageNumbers().map((p, idx) =>
                    typeof p === "number" ? (
                        <button
                            key={idx}
                            onClick={() => table.setPageIndex(p)}
                            className={cn(
                                "text-sm lg:text-base w-7 h-7 cursor-pointer rounded",
                                p === pageIndex
                                ? "text-gold border border-gold font-semibold"
                                : "hover:text-gold"
                            )}
                        >
                        {p + 1}
                        </button>
                    ) : (
                        <span key={idx} className="px-2 py-1 text-muted">{p}</span>
                    )
                )}

                {/* Next & Last */}
                <PaginationButton
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    tooltip="Next"
                >
                    <ChevronRight className="hover:text-gold"/>
                </PaginationButton>
                <PaginationButton
                    onClick={() => table.setPageIndex(pageCount - 1)}
                    disabled={!table.getCanNextPage()}
                    tooltip="Last"
                >
                    <ChevronsRight className="hover:text-gold"/>
                </PaginationButton>
            </div>

            {/* Page size */}
            <div className="flex items-center gap-2">
                <span className="text-sm">Rows per page:</span>
                <select
                    value={pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    {[5, 10, 20, 50, 100].map((size) => (
                        <option key={size} value={size} className="bg-panel">
                        {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};