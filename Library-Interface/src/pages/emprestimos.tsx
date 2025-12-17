import "../styles/global.css";
import LoanTablePage from "../components/MockedTables/LoanTablePage";
import { useEffect, useState } from "react";
//import { getEmprestimos } from "../service/api/emprestimosApi";
//import type { Loan } from "../types/loan";
import { useSearchParams } from "react-router-dom";

interface URLState {
  page: number;
  id?: string;
  userName?: string;
  bookName?: string;
  status?: string;
  dataLoan?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export default function Emprestimos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  //const [loans, setLoans] = useState<Loan[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const urlState: URLState = {
    page: parseInt(searchParams.get('page') || '0'),
    id: searchParams.get('id') || undefined,
    userName: searchParams.get('userName') || undefined,
    bookName: searchParams.get('bookName') || undefined,
    status: searchParams.get('status') || undefined,
    dataLoan: searchParams.get('dataLoan') || undefined,
    sort: searchParams.get('sort') || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || undefined
  };
/*
  useEffect(() => {
    const fetchEmprestimos = async () => {
      console.log("[Emprestimos] Buscando empréstimos com estado:", urlState);
      try {
        const response = await getEmprestimos({
          page: urlState.page,
        });
        console.log("[Emprestimos] Resposta paginada:", response);
        setLoans(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("[Emprestimos] Erro ao carregar empréstimos:", error);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, [urlState.page]);
*/
  const handlePageChange = (newPage: number) => {
    updateURLState({ page: newPage });
  };

  const handleFilterChange = (filters: Partial<URLState>) => {
    updateURLState({ ...filters, page: 0 });
  }

  const updateURLState = (update: Partial<URLState>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(update).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  return (
    <div className="archive-page">
      <LoanTablePage
      /*loans={loans}
      totalPages={totalPages}
      loading={loading}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      urlState={urlState}
      currentPage={urlState.page}
      */
      />
    </div>
  );
}