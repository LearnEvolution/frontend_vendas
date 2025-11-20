// src/pages/Dashboard.jsx
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="dashboard-container">
      <h1>📊 Sistema de Vendas</h1>

      <nav className="menu">
        <Link to="/clientes">👥 Clientes</Link>
        <Link to="/produtos">📦 Produtos</Link>
        <Link to="/vendas">🧾 Vendas</Link>
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        Sair
      </button>
    </div>
  );
}

export default Dashboard;

