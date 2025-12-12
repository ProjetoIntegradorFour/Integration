import axios from "axios";

export const apiCatalog = axios.create({
  baseURL: "http://localhost:8080/catalog",
});
