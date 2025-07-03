import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";
import "../styles/Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">Salud del Corazón</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>

            {user?.user_type === "paciente" && (
              <>
                <li>
                  <Link to="/diagnostico">Diagnóstico</Link>
                </li>
                <li>
                  <Link to="/resultados">Resultados</Link>
                </li>
              </>
            )}

            {user?.user_type === "admin" && (
              <li>
                <Link to="/admin">Panel Admin</Link>
              </li>
            )}

            <li>
              {user ? (
                <div className="user-menu">
                  <button
                    className="user-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    <span className="icon">👤</span> {user.username} ▼
                  </button>

                  {menuOpen && (
                    <div className="user-dropdown">
                      <button onClick={() => navigate("/configuracion")}>
                        Configuración
                      </button>
                      <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">Iniciar Sesión</Link>
                  <Link to="/registro">Registrarse</Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
