import React from "react";
import Clientes from "./components/Clientes.jsx";
import Produtos from "./components/Produtos.jsx";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema de Vendas</h1>
      <Clientes />
      <Produtos />
    </div>
  );
}

export default App;
