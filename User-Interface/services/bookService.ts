import { apiCatalog } from "./apiCatalog";

const BASE_URL = "https://librarytor6700.duckdns.org";

export const getAllBooks = async () => {
  try {
    const res = await apiCatalog.get("");
    return res.data.content; // PEGAMOS APENAS O ARRAY
  } catch (err: any) {
    console.log("❌ ERRO NO GET ALL BOOKS:", err.message);
    throw err;
  }
};

export const getBookByIsbn = async (isbn: string) => {
  try {
    const res = await apiCatalog.get(`/${isbn}`);
    return res.data;
  } catch (err: any) {
    console.log("❌ ERRO NO GET BOOK BY ISBN:", err.message);
    throw err;
  }
};

export async function searchBooks(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/catalog?page=0&size=1000&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Erro ao buscar livros");

    const data = await response.json();
    return data.content || []; // backend geralmente retorna assim
  } catch (error) {
    console.error("searchBooks error:", error);
    return [];
  }
}
