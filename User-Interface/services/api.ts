import axios from "axios";

const api = axios.create({
  baseURL: "http://10.34.249.247:8080/api",
});

export default api;