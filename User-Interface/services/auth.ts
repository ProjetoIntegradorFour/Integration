import api from "./api";

export async function login(cpf, password) {
  try {
    const response = await api.post("/auth/signin", { cpf, password });
    return response.data; // vai retornar JwtResponse
  } catch (error) {
    console.error("Erro ao logar:", error.response?.data || error.message);
    throw error;
  }
}