import { useState, useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Produtos() {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  
   const API_URL = import.meta.env.VITE_API_URL + "/produtos";

  // Buscar produtos do backend
  const carregarProdutos = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`${API_URL}?email=${user.email}`);
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  // Carregar quando abrir a página
  useEffect(() => {
    carregarProdutos();
  }, [user]);

  // Atualiza o total sempre que produtos mudam
  useEffect(() => {
    const soma = produtos.reduce((acc, p) => acc + Number(p.preco), 0);
    setTotal(soma);
  }, [produtos]);

  // Criar produto no backend
  const salvarProduto = async () => {
    if (!nome || !preco) {
      alert("Preencha nome e preço!");
      return;
    }

    try {
      await axios.post(API_URL, {
        nome,
        preco: Number(preco),
        usuarioEmail: user.email,
      });

      setNome("");
      setPreco("");

      carregarProdutos(); // Recarrega do banco
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  // Excluir produto no backend
  const excluir = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  };

  return (
    <div className="container grad-produtos">
      <div className="card-produtos">
        <h1 className="titulo">
          <FaBox style={{ marginRight: 8 }} />
          Produtos
        </h1>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button className="btn-produtos" onClick={salvarProduto}>
          Salvar Produto
        </button>

        <h2 className="listaTitulo">Lista de Produtos</h2>

        <ul className="lista">
          {produtos.length === 0 && (
            <p className="vazio">Nenhum produto cadastrado.</p>
          )}

          {produtos.map((p) => (
            <li key={p._id} className="item">
              <span>
                <strong>{p.nome}</strong> — R$ {Number(p.preco).toFixed(2)}
              </span>

              <button className="btnExcluir" onClick={() => excluir(p._id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>

        <h2 className="listaTitulo">
          Total: <strong>R$ {total.toFixed(2)}</strong>
        </h2>
      </div>
    </div>
  );
}

export default Produtos;
