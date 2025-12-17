import "../styles/global.css";
import TablePage from "../components/MockedTables/TablePage";
import { useEffect, useState } from "react";
import { getLivros } from "../service/api/acervoApi";
import type { Book } from "../types/book";
import { useSearchParams } from "react-router-dom";

// Define ALL possible URL parameters
interface URLState {
  page: number;
  // Future filters - already in place!
  id?: string;
  cdd?: string;
  titulo?: string;
  autor?: string;
  // Future sorting
  sort?: string;
  order?: 'asc' | 'desc';
}

export default function Acervo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  // Parse ALL URL parameters
  const urlState: URLState = {
    page: parseInt(searchParams.get('page') || '0'),
    id: searchParams.get('id') || undefined,
    cdd: searchParams.get('cdd') || undefined,
    titulo: searchParams.get('titulo') || undefined,
    autor: searchParams.get('autor') || undefined,
    sort: searchParams.get('sort') || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || undefined
  };

  useEffect(() => {
    const fetchLivros = async () => {
      console.log("[Acervo] Buscando livros com estado:", urlState);
      try {
        // ✅ FIX: Pass as object instead of number
        const response = await getLivros({
          page: urlState.page,
          // size: 14, // Optional - your default is already 14
          // Future: Add filters here when backend is ready
          // autor: urlState.autor,
          // titulo: urlState.titulo,
        });
        console.log("[Acervo] Resposta paginada:", response);
        setBooks(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("[Acervo] Erro ao carregar livros:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, [urlState.page]);

  const handlePageChange = (newPage: number) => {
    updateURLState({ page: newPage });
  };

  // FUTURE: Handle filter changes
  const handleFilterChange = (filters: Partial<URLState>) => {
    updateURLState({ ...filters, page: 0 }); // Reset to page 0 when filters change
  };

  // UNIVERSAL URL updater
  const updateURLState = (updates: Partial<URLState>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  return (
    <div className="archive-page">
      <TablePage
        books={books}
        loading={loading}
        currentPage={urlState.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        // FUTURE: Pass URL state down for filters
        urlState={urlState}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}