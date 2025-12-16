import axios from "axios";

const api = axios.create({
  baseURL: "https://librarytor6700.duckdns.org/api",
});

export default api;