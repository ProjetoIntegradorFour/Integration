import { NavLink, useNavigate } from "react-router-dom";
import { getAccessibleRoutes } from "../service/routeGuards";

import dashboardIcon from "../assets/img/dashboard.png";
import acervoIcon from "../assets/img/book.png";
import emprestimosIcon from "../assets/img/user.png";
import atrasosIcon from "../assets/img/money.png";
import copiaIcon from "../assets/img/document.png";
import perfilIcon from "../assets/img/perfil.png";
import exitIcon from "../assets/img/exit.png";

interface SidebarProps {
  onOpenPerfil: () => void;
}

export default function Sidebar({ onOpenPerfil }: SidebarProps) {
  const navigate = useNavigate();
  const accessibleRoutes = getAccessibleRoutes();

  const shouldShowRoute = (path: string): boolean => {
    return accessibleRoutes.includes(path);
  };

  const blockedRoutes = ["/emprestimos", "/atrasos"];

  const isBlocked = (path: string) => blockedRoutes.includes(path);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {shouldShowRoute("/") && (
        <NavLink
          to="/"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <img src={dashboardIcon} alt="Dashboard" className="icon" />
          Dashboard
        </NavLink>
      )}

      {shouldShowRoute("/acervo") && (
        <NavLink
          to="/acervo"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <img src={acervoIcon} alt="Acervo" className="icon" />
          Acervo
        </NavLink>
      )}

      {shouldShowRoute("/copia") && (
        <NavLink
          to="/copia"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <img src={copiaIcon} alt="Cópia" className="icon" />
          Cópia
        </NavLink>
      )}

      {shouldShowRoute("/emprestimos") && (
        <div className={`menu-item disabled`}>
          <img src={emprestimosIcon} alt="Empréstimos" className="icon" />
          Empréstimos
        </div>
      )}

      {shouldShowRoute("/atrasos") && (
        <div className={`menu-item disabled`}>
          <img src={atrasosIcon} alt="Atrasos/Pagamentos" className="icon" />
          Atrasos/Pagamentos
        </div>
      )}

      <div className="menu-bottom">
        {shouldShowRoute("/perfil") && (
          <div className="mini-item" onClick={onOpenPerfil}>
            <img src={perfilIcon} alt="Perfil" className="mini-icon" />
          </div>
        )}

        <div className="mini-item" onClick={handleLogout}>
          <img src={exitIcon} alt="Sair" className="mini-icon" />
        </div>
      </div>
    </aside>
  );
}