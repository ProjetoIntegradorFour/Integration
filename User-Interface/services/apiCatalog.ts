import axios from "axios";

export const apiCatalog = axios.create({
  baseURL: "http://10.109.3.118:8080/catalog",
});
