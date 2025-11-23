import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const result = await login(email, senha);

    setLoading(false);

    if (!result.success) {
      setMsg(result.message);
      return;
    }

    setMsg("Entrando...");
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      padding: 20
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.12)",
          padding: 30,
          borderRadius: 20,
          color: "#fff",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Entrar</h2>

        {msg && (
          <p style={{ textAlign: "center", marginBottom: 10 }}>
            {msg}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 15px",
            background: loading ? "#666" : "#00e676",
            border: "none",
            borderRadius: 10,
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: 5
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          Não tem conta?{" "}
          <Link to="/register" style={{ color: "#fff", textDecoration: "underline" }}>
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 15,
  padding: "12px 15px",
  borderRadius: 10,
  border: "none",
  outline: "none"
};
