import React, { useState } from "react";
import GenericTable from "../Table/GenericTable";
import { bookColumns, bookTableConfig } from "../Table/config/bookTableConfig";
import type { Book } from "../../types/book";

interface TablePageProps {
  books: Book[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  urlState?: {
    id?: string;
    cdd?: string;
    titulo?: string;
    autor?: string;
  };
  onFilterChange?: (filters: any) => void;
}

const TablePage: React.FC<TablePageProps> = ({
  books,
  loading,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (items: Book[]) => {
    if (selectedRows.length === items.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(items.map(item => item.id));
    }
  };

  return (
    <GenericTable
      // Table data
      data={books}
      columns={bookColumns}
      loading={loading}
      // Selection
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
      onSelectAll={handleSelectAll}
      config={bookTableConfig}
      // Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default TablePage;