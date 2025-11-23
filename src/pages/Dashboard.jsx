import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          padding: "35px",
          borderRadius: "20px",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "25px" }}>
          📊 Dashboard
        </h1>

        <p style={{ marginBottom: "25px", opacity: 0.9 }}>
          Bem-vindo! Escolha abaixo o menu desejado:
        </p>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <Link to="/clientes" style={menuButton}>
            👥 Clientes
          </Link>

          <Link to="/produtos" style={menuButton}>
            📦 Produtos
          </Link>

          <Link to="/vendas" style={menuButton}>
            🧾 Vendas
          </Link>
        </div>

        {/* BOTÃO SAIR */}
        <button onClick={logout} style={logoutButton}>
          Sair
        </button>
      </div>
    </div>
  );
}

/* ======== ESTILOS DO MENU ========== */

const menuButton = {
  padding: "14px 0",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(8px)",
  textDecoration: "none",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "600",
  transition: "0.3s",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const logoutButton = {
  padding: "12px 20px",
  width: "100%",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
};
