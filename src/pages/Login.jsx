import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("https://sistema-vendas-8a8p.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!data.token) {
      alert("Login inválido");
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Entrar
        </button>
      </form>

      <br /><br />

      {/* Botão voltar ao início */}
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Login;
