// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    try {
      const base = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.token) {
        setMsg(data.msg || data.erro || "Email ou senha incorretos.");
        return;
      }

      // salvar token localmente
      localStorage.setItem("token", data.token);
      // redirecionar para dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setMsg("Erro de rede. Tente novamente.");
    }
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

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <br />

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Login;

