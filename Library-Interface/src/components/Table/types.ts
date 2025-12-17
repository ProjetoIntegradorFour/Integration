export interface TableColumn<T> {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
}

export interface TableConfig {
    selectable?: boolean;
    pagination?: boolean;
    sortable?: boolean;
    filterable?: boolean;
}

export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    loading: boolean;
    selectedRows?: number[];
    onRowSelect?: (id: number) => void;
    onSelectAll?: (items: T[]) => void;
    config?: TableConfig;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}