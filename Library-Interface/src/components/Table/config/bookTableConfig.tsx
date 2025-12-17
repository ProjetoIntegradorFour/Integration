import type { TableColumn } from "../types";
import type { Book } from "../../../types/book";

export const bookColumns: TableColumn<Book>[] = [
    {
        key: "id",
        header: "ID",
        render: (book) => book.id,
        sortable: true,
        filterable: true
    },
    {
        key: "cdd",
        header: "CDD / CDU",
        render: (book) => book.cdd,
        sortable: true,
        filterable: true
    },
    {
        key: "titulo",
        header: "TÍTULO",
        render: (book) => book.titulo,
        sortable: true,
        filterable: true
    },
    {
        key: "autor",
        header: "AUTOR",
        render: (book) => book.autor,
        sortable: true,
        filterable: true
    }
];

export const bookTableConfig = {
    selectable: true,
    pagination: true,
    sortable: true,
    filterable: true
};