import logo from "../assets/img/logo.png"; 

export default function Header() {
  return (
    <header className="header">
      <div className="logo-text">
        <img src={logo} alt="Logo" className="logo" />
        <div className="text">
          <span>SENAI</span>
          <span>Biblioteca Virtual</span>
        </div>
      </div>
    </header>
  );
}
