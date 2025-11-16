// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.msg || "Usuário registrado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMsg(data.msg || "Não foi possível registrar");
      }
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setMsg("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>Registrar</h1>
      {msg && <p className={`message ${msg.includes("sucesso") ? "success" : ""}`}>{msg}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        <button type="submit">Registrar</button>
      </form>

      <Link to="/login">
        <button className="link-button">Voltar ao Login</button>
      </Link>
    </div>
  );
}

export default Register;
