import "../styles/global.css";
interface PerfilProps {
  open: boolean;
  onClose: () => void;
}

export default function Perfil({ open, onClose }: PerfilProps) {
  if (!open) return null;

  return (
    <div className="perfil-overlay" onClick={onClose}>
      <div
        className="perfil-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="perfil-header">
          <h2>Meu Perfil</h2>
        </header>

        <section className="perfil-body">
          <div className="perfil-field">
            <label>Nome</label>
            <input type="text" value="João Peido" disabled />
          </div>

          <div className="perfil-field">
            <label>CPF</label>
            <input type="email" value="111.111.111-11" disabled />
          </div>

          <div className="perfil-field">
            <label>Tipo de usuário</label>
            <input type="text" value="Administrador" disabled />
          </div>
        </section>

        <footer className="perfil-footer">
          <button onClick={onClose}>Fechar</button>
        </footer>
      </div>
    </div>
  );
}