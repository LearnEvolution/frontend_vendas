import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Sistema de Vendas</h1>

      <div style={{ marginTop: "40px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", marginRight: "20px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={{ padding: "10px 20px" }}>
            Registrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
