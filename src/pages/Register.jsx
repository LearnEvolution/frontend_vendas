import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    await fetch("https://sistema-vendas-8a8p.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    alert("Usuário registrado com sucesso!");
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

      <br /><br />

      <Link to="/login">
        <button>Voltar ao Login</button>
      </Link>
    </div>
  );
}

export default Register;
