import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Diagnostico from "./pages/Diagnostico";
import Resultados from "./pages/Resultados";
import AdminPanel from "./pages/AdminPanel";
import VerDiagnosticos from "./pages/VerDiagnosticos";
import Configuracion from "./pages/Configuracion";
import "./styles/main.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-wrapper">
          <Header />
          <main className="container main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <h1 className="home-container">
                    Bienvenido a Salud del Corazón
                  </h1>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/diagnostico" element={<Diagnostico />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route
                path="/admin/diagnosticos/:paciente_id"
                element={<VerDiagnosticos />}
              />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/resultados" element={<Resultados />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
