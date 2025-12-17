import "../styles/global.css";
import CopyTablePage from "../components/MockedTables/CopyTablePage";
import { useSearchParams } from "react-router-dom";

interface URLState {
  page: number;
  ISBN?: string;
  livro?: string;
  status?: string;
  aluno?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export default function Copia() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlState: URLState = {
    page: parseInt(searchParams.get("page") || "0"),
    ISBN: searchParams.get("ISBN") || undefined,
    livro: searchParams.get("livro") || undefined,
    status: searchParams.get("status") || undefined,
    aluno: searchParams.get("aluno") || undefined,
    sort: searchParams.get("sort") || undefined,
    order: (searchParams.get("order") as "asc" | "desc") || undefined,
  };

  return (
    <div className="archive-page">
      <CopyTablePage
      />
    </div>
  );
}
