// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setMensagem("❌ Email ou senha incorretos");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setMensagem("✅ Login realizado! Redirecionando...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    } catch (err) {
      console.error("Erro no login:", err);
      setMensagem("❌ Erro de rede. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Login</h1>

      {mensagem && (
        <p className={`message ${mensagem.includes("✅") ? "success" : ""}`}>
          {mensagem}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Entrando..." : "Entrar"}</button>
      </form>

      <Link to="/">
        <button className="link-button">Voltar</button>
      </Link>
    </div>
  );
}

export default Login;
