import { useState } from "react";

export default function Vendas() {
  const [lista, setLista] = useState([]);
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  function registrar(e) {
    e.preventDefault();
    setMensagem("");

    if (!cliente.trim() || !produto.trim() || !valor.trim()) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const nova = { id: Date.now(), cliente, produto, valor: parseFloat(valor) };
    setLista([...lista, nova]);
    setCliente(""); setProduto(""); setValor("");
    setMensagem("Venda registrada!");
    setTimeout(() => setMensagem(""), 1000);
  }

  function excluir(id) {
    setLista(lista.filter((v) => v.id !== id));
  }

  return (
    <div style={page}>
      <div style={card}>
        <h1>🧾 Vendas</h1>

        {mensagem && <div style={{ marginBottom: 10 }}>{mensagem}</div>}

        <form onSubmit={registrar}>
          <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} style={input} />
          <input placeholder="Produto" value={produto} onChange={(e) => setProduto(e.target.value)} style={input} />
          <input placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} style={input} />
          <button type="submit" style={btn}>Registrar Venda</button>
        </form>

        <div style={{ marginTop: 18 }}>
          {lista.map((v) => (
            <div key={v.id} style={item}>
              <div>
                <strong>{v.produto}</strong><br />
                <small>Cliente: {v.cliente} — R$ {v.valor.toFixed(2)}</small>
              </div>
              <button onClick={() => excluir(v.id)} style={deleteBtn}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* estilos */
const page = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "linear-gradient(135deg,#11998e,#38ef7d)" };
const card = { width: "100%", maxWidth: 600, padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.12)", color: "#fff" };
const input = { width: "100%", padding: 12, borderRadius: 10, marginBottom: 10, border: "none", background: "rgba(255,255,255,0.95)" };
const btn = { width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(90deg,#00c6ff,#0072ff)", color: "#fff", fontWeight: 700 };
const item = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.08)", padding: 12, borderRadius: 10, marginBottom: 10 };
const deleteBtn = { padding: "8px 12px", borderRadius: 8, background: "#ff4d4d", border: "none", color: "#fff" };
