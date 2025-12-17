import { apiService } from "../apiService";
import type { Book, PaginatedResponse } from "../../types/book";

const ACERVO_ENDPOINT = "/collections";

interface GetLivrosParams {
  page: number;
  size?: number;
  id?: string;
  cdd?: string;
  titulo?: string;
  autor?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const getLivros = async (params: GetLivrosParams): Promise<PaginatedResponse<Book>> => {
  const { page, size = 14, ...filters } = params;
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...filters
  });

  return await apiService.get(`${ACERVO_ENDPOINT}?${queryParams}`);
};