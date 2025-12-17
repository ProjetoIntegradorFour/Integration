import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Register = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [form, setForm] = useState({
    username: "",
    cpf: "",
    password: "",
    role: "ADMIN",
  });

  // POPUP DE SUCESSO
  const [showPopup, setShowPopup] = useState(false);

  // =============== CPF ARRUMADO ===============
  const handleCpf = (value: string) => {
    let cpf = value.replace(/\D/g, ""); // só números

    if (cpf.length > 11) cpf = cpf.slice(0, 11); // 11 dígitos máx

    // Formatação automática
    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    setForm({ ...form, cpf });
  };
  // ============================================

  // BUSCAR USUÁRIOS
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Erro ao buscar usuários:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CRIAR USUÁRIO
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          cpf: form.cpf,
          password: form.password,
          role: [form.role],
        }),
      });

      if (!res.ok) {
        console.log("Erro:", await res.text());
        return;
      }

      await fetchUsers();

      setShowPopup(true);

    } catch (err) {
      console.log("Erro:", err);
    }
  };

  // LOGIN
  const enterSystem = () => {
    if (!selectedUser) return alert("Selecione um usuário");

    localStorage.setItem("loggedUser", selectedUser);
    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Criar Usuário</h2>

        <form onSubmit={registerUser} className="register-form">
          <label className="register-label">Nome de Usuário</label>
          <input
            className="register-input"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <label className="register-label">CPF</label>
          <input
            className="register-input"
            name="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={(e) => handleCpf(e.target.value)}
            required
          />

          <label className="register-label">Senha</label>
          <input
            className="register-input"
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <label className="register-label">Tipo de Usuário</label>
          <select
            className="register-input register-select"
            name="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>

          <button type="submit" className="register-button">
            Criar Usuário
          </button>
        </form>

        <hr className="register-divider" />

        <h3 className="register-title">Entrar</h3>

        {loadingUsers ? (
          <p>Carregando usuários...</p>
        ) : (
          <>
            <select
              className="register-input register-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Selecione um usuário</option>
              {users.map((u) => (
                <option key={u.id} value={u.username}>
                  {u.username} — {u.role}
                </option>
              ))}
            </select>

            <button onClick={enterSystem} className="register-button">
              Entrar
            </button>
          </>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Usuário criado com sucesso!</h3>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
