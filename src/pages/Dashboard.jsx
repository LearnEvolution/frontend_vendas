// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/"); // volta ao início
  }

  return (
    <div style={{ margin: "50px" }}>
      <h1>Bem-vindo ao Sistema de Vendas!</h1>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;
