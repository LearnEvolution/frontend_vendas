// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.warn("failed parsing saved user", e);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN robusto: aceita várias formas de resposta do backend
  const login = async (email, senha) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
      });

      const data = res.data || {};

      const token = data.token || data.accessToken || null;

      // tenta extrair um objeto user/usuario retornado pelo backend
      const returnedUser =
        data.usuario || data.user || data.usuarioLogado || data.usuario_login || null;

      let usuario = null;

      if (returnedUser && typeof returnedUser === "object") {
        // se veio um objeto de usuário, usamos ele
        usuario = returnedUser;
      } else if (returnedUser && typeof returnedUser === "string") {
        // se veio algo simples (ex: email), normalizamos
        usuario = { email: returnedUser };
      } else if (data.email) {
        // se o backend devolveu o email no body
        usuario = { email: data.email };
      } else if (email) {
        // fallback: usamos o email que o usuário digitou
        usuario = { email };
      }

      if (!token) {
        // ainda aceitamos login sem token (depende da sua API) — mas avisamos
        return { success: false, message: "Token não recebido" };
      }

      // salva token e usuário localmente
      localStorage.setItem("token", token);
      if (usuario) {
        try {
          localStorage.setItem("user", JSON.stringify(usuario));
        } catch (e) {
          console.warn("Erro ao salvar user no localStorage", e);
        }
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(usuario);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || "Erro no login" };
    }
  };

  const register = async (nome, email, senha, telefone) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        nome,
        email,
        senha,
        telefone,
      });

      return { success: true, message: res.data.msg };
    } catch (err) {
      return { success: false, message: err.response?.data?.msg || "Erro ao registrar" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
