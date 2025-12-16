import axios from "axios";

export const apiCatalog = axios.create({
  baseURL: "http://169.254.188.118:8080/catalog",
});
