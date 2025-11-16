// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMsg("");

    try {
      const base = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${base}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ msg: "Erro ao cadastrar" }));
        setMsg(err.msg || err.erro || "Erro ao cadastrar");
        return;
      }

      setMsg("Cadastro realizado com sucesso! Você pode entrar agora.");
      // opcional: limpar campos
      setNome(""); setEmail(""); setTelefone(""); setSenha("");
      // mostrar botão/tempo e ir pra login
      setTimeout(() => navigate("/login"), 1400);
    } catch (error) {
      console.error("Erro no register:", error);
      setMsg("Erro de rede ao cadastrar.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Registrar</h1>

      <form onSubmit={handleRegister} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
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
          Registrar
        </button>
      </form>

      <p style={{ color: msg.includes("sucesso") ? "green" : "red" }}>{msg}</p>

      <br />

      <Link to="/login">
        <button>Voltar ao Login</button>
      </Link>
    </div>
  );
}

export default Register;
