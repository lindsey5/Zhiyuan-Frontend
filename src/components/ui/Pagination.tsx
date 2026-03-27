import { type Table } from "@tanstack/react-table";
import { cn } from "../../utils/utils";

interface PaginationControlsProps<T> {
    table: Table<T>;
}

export const PaginationControls = <T,>({ table }: PaginationControlsProps<T>) => {
    const { pageIndex } = table.getState().pagination;
    const pageCount = table.getPageCount();

    const delta = 2; // pages around current page

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

    return (
        <div className="flex items-center justify-end gap-1 mt-4 lg:text-sm xxl:text-md text-primary flex-wrap">
            {/* First & Prev */}
            <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 rounded hover:bg-hover disabled:opacity-50 cursor-pointer"
            >
                First
            </button>
            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 rounded hover:bg-hover disabled:opacity-50 cursor-pointer"
            >
                Prev
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, idx) =>
                typeof p === "number" ? (
                <button
                    key={idx}
                    onClick={() => table.setPageIndex(p)}
                    className={cn(
                        "w-7 h-7 cursor-pointer rounded",
                        p === pageIndex
                        ? "bg-gold font-semibold text-avatar"
                        : "hover:text-gold"
                    )}
                >
                    {p + 1}
                </button>
                ) : (
                <span key={idx} className="px-2 py-1 text-muted">
                    {p}
                </span>
                )
            )}

            {/* Next & Last */}
            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 rounded hover:bg-hover disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
            <button
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 rounded hover:bg-hover disabled:opacity-50 cursor-pointer"
            >
                Last
            </button>
        </div>
    );
};