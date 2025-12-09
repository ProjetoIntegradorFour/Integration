import axios from "axios";

const api = axios.create({
  baseURL: "http://10.109.3.118:8080/api",
});

export default api;