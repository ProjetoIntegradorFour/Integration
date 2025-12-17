import { useEffect, useState } from "react";
import "../styles/login.css";
import * as authService from "../service/authService";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated() || authService.HasEnvBypass()) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login(cpf, password);
      console.log("Login successful:", result);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err);
      alert("Usuário ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Biblioteca Virtual</h1>
        <form onSubmit={handleSubmit}>
          <input type="number" inputMode="numeric" id="cpf" placeholder="Digite seu CPF" required autoComplete="off" title="Insert your CPF"
            value={cpf} onChange={(e) => setCpf(e.target.value)} />

          <input type="password" id="password" placeholder="Digite sua senha" required autoComplete="off" title="Insert your Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={isLoading}> {isLoading ? "Entrando..." : "Entrar"} </button>
        </form>
      </div>

    </div>
  );
}
