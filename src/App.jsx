// src/App.jsx
import "./style.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";

function App() {
  return (
    <Routes>
      {/* raiz -> Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* register separado */}
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/vendas" element={<Vendas />} />
    </Routes>
  );
}

export default App;
