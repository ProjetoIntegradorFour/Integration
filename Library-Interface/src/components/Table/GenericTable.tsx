import TableBody from "./TableBody";
import Pagination from "./Pagination";
import type { TableProps, PaginationProps } from "./types";

interface GenericTableProps<T> extends TableProps<T>, PaginationProps {
    // header actoins
}

const GenericTable = <T extends { id: number }>({
    // Table props
    data,
    columns,
    loading,
    selectedRows = [],
    onRowSelect,
    onSelectAll,
    config = {},
    // Pagination props
    currentPage,
    totalPages,
    onPageChange
}: GenericTableProps<T>) => {
    return (
        <div className="table-page-container">
            {/* header */}

            <TableBody
                data={data}
                columns={columns}
                loading={loading}
                selectedRows={selectedRows}
                onRowSelect={onRowSelect}
                onSelectAll={onSelectAll}
                config={config}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default GenericTable;