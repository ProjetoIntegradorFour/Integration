import axios from "axios";

const api = axios.create({
  baseURL: "http://169.254.188.118:8080/api",
});

export default api;