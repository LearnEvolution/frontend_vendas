import { useState } from "react";

export default function Clientes() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function salvar(e) {
    e.preventDefault();
    setMensagem("");

    if (!nome.trim() || !email.trim()) {
      setMensagem("Preencha nome e email.");
      return;
    }

    const novo = { id: Date.now(), nome, email };
    setLista([...lista, novo]);
    setNome("");
    setEmail("");
    setMensagem("Cliente adicionado!");
    setTimeout(() => setMensagem(""), 1200);
  }

  function excluir(id) {
    setLista(lista.filter((c) => c.id !== id));
  }

  return (
    <div style={pageWrap}>
      <div style={card}>
        <h1>👥 Clientes</h1>

        {mensagem && <div style={{ marginBottom: 10 }}>{mensagem}</div>}

        <form onSubmit={salvar}>
          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={input} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
          <button type="submit" style={btn}>Salvar</button>
        </form>

        <div style={{ marginTop: 18 }}>
          {lista.map((c) => (
            <div key={c.id} style={item}>
              <div>
                <strong>{c.nome}</strong><br />
                <small>{c.email}</small>
              </div>
              <button onClick={() => excluir(c.id)} style={deleteBtn}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* estilos simples */
const pageWrap = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "linear-gradient(135deg,#8E2DE2,#4A00E0)" };
const card = { width: "100%", maxWidth: 540, padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.12)", color: "#fff" };
const input = { width: "100%", padding: 12, borderRadius: 10, marginBottom: 10, border: "none", background: "rgba(255,255,255,0.95)" };
const btn = { width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(90deg,#fc466b,#3f5efb)", color: "#fff", fontWeight: 700 };
const item = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.08)", padding: 12, borderRadius: 10, marginBottom: 10 };
const deleteBtn = { padding: "8px 12px", borderRadius: 8, background: "#ff4d4d", border: "none", color: "#fff" };
