import "../styles/global.css";
import PaymentTablePage from "../components/MockedTables/PaymentTablePage";
import { use, useEffect, useState } from "react";
//import { getAtrasos } from "../service/api/atrasosApi";
//import type { Payment } from "../types/payment";
import { useSearchParams } from "react-router-dom";

interface URLState {
  page: number;
  id?: string;
  userName?: string;
  bookTitle?: string;
  fineAmount?: string;
  dueDate?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export default function Emprestimos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  //const [payments, setPayments] = useState<Payment[]>([]);
  const [totalPages, setTotalPages] = useState(0)

  const urlState: URLState = {
    page: parseInt(searchParams.get('page') || '0'),
    id: searchParams.get('id') || undefined,
    userName: searchParams.get('userName') || undefined,
    bookTitle: searchParams.get('bookTitle') || undefined,
    fineAmount: searchParams.get('fineAmount') || undefined,
    dueDate: searchParams.get('dueDate') || undefined,
    sort: searchParams.get('sort') || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || undefined
  };

  useEffect(() => {
    const fetchAtrasos = async () => {
      console.log("[Atrasos] Buscando atrasos com estado:", urlState);
      try {
        //const response = await getAtrasos({
        //  page: urlState.page,
        //});
        //console.log("[Atrasos] Resposta paginada:", response);
        //setPayments(response.content);
        //setTotalPages(response.totalPages);
      } catch (error) {
        console.error("[Atrasos] Erro ao carregar atrasos:", error);
        //setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAtrasos();
  }, [urlState.page]);

  const handlePageChange = (newPage: number) => {
    updateURLState({ page: newPage });
  };

  const handleFilterChange = (filters: Partial<URLState>) => {
    updateURLState({ ...filters, page: 0 });
  };

  const updateURLState = (update: Partial<URLState>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(update).forEach(([key, value]) => {
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
      <PaymentTablePage
      /* 
      totalPages={totalPages}
      loading={loading}
      currentPage={urlState.page}
      payments={payments}
      onPageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      urlState={urlState}
      */
      />
    </div>
  );
}