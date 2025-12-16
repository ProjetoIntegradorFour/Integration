import axios from "axios";

export const apiCatalog = axios.create({
  baseURL: "http://10.34.249.247:8080/catalog",
});
