import type { PaginationProps } from "./types";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination" >
            <span>Página {currentPage + 1} de {totalPages} </span>
            < button onClick={handlePreviousPage} disabled={currentPage === 0
            }>
                Anterior
            </button>
            < button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                Próxima
            </button>
        </div>
    );
};

export default Pagination;