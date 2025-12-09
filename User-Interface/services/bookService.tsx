import { apiCatalog } from "./apiCatalog";

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
