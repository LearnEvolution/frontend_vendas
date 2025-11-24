import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

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
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, senha });

      const token = res.data.token;
      const usuario = { email };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(usuario);
      return { success: true };

    } catch (err) {
      return { success: false, message: err.response?.data?.msg || "Erro no login" };
    }
  };

  const register = async (nome, email, telefone, senha) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        nome,
        email,
        telefone,
        senha,
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
