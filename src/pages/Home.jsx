// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Sistema de Vendas</h1>

      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Registrar</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
