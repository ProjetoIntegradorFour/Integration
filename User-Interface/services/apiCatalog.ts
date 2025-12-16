import axios from "axios";

export const apiCatalog = axios.create({
  baseURL: "https://librarytor6700.duckdns.org/catalog",
});
