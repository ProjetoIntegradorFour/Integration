import type { TableProps } from "./types";

interface TableBodyProps<T> extends TableProps<T> { }

const TableBody = <T extends { id: number }>({
    data,
    columns,
    loading,
    selectedRows = [],
    onRowSelect,
    onSelectAll,
    config = {}
}: TableBodyProps<T>) => {
    const { selectable = true } = config;

    return (
        <div className="table-wrapper" >
            <table className="custom-table" >
                <thead>
                    <tr>
                        {selectable && (
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={() => onSelectAll?.(data)}
                                    checked={selectedRows.length === data.length && data.length > 0}
                                />
                            </th>
                        )}
                        {
                            columns.map((column) => (
                                <th key={column.key} > {column.header} </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)}
                                    style={{ textAlign: "center", padding: "18px 0" }
                                    }>
                                    Carregando...
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className={selectedRows.includes(item.id) ? "selected" : ""} >
                                    {selectable && (
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => onRowSelect?.(item.id)}
                                            />
                                        </td>
                                    )}
                                    {
                                        columns.map((column) => (
                                            <td key={column.key} > {column.render(item)} </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)}
                                    style={{ textAlign: "center", padding: "18px 0" }}>
                                    Nenhum registro
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default TableBody;