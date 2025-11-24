// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // -----------------------
    // VALIDAÇÕES DO FRONT
    // -----------------------

    if (!nome.trim()) {
      return setMsg("Digite seu nome completo.");
    }

    if (!email.trim()) {
      return setMsg("Digite um e-mail válido.");
    }

    // Regex de validação profissional
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return setMsg("Digite um e-mail válido.");
    }

    if (senha.length < 4) {
      return setMsg("A senha precisa ter pelo menos 4 caracteres.");
    }

    setLoading(true);

    // Segue a ORDEM correta para enviar ao backend
    const result = await register(nome, email, telefone, senha);

    setLoading(false);

    if (!result.success) {
      setMsg(result.message);
      return;
    }

    setMsg("Cadastro realizado! Redirecionando...");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          padding: "30px 35px",
          borderRadius: 16,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Criar Conta</h2>

        {msg && (
          <p
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "10px",
              borderRadius: 8,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {msg}
          </p>
        )}

        <input
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Telefone (opcional)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 15,
            padding: "12px",
            background: loading ? "#555" : "#00e676",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <div style={{ marginTop: 15, textAlign: "center" }}>
          Já tem conta?{" "}
          <Link to="/login" style={{ color: "#fff", textDecoration: "underline" }}>
            Fazer login
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  marginBottom: 12,
  padding: "12px",
  borderRadius: 10,
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.85)",
  fontSize: 16,
};
