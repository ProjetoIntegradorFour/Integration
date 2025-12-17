import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Perfil from "../components/perfil";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [perfilOpen, setPerfilOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar onOpenPerfil={() => setPerfilOpen(true)} />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ marginTop: "60px", padding: "1rem" }}>
          {children}
        </div>
      </div>

      <Perfil
        open={perfilOpen}
        onClose={() => setPerfilOpen(false)}
      />
    </div>
  );
};

export default ProtectedLayout;