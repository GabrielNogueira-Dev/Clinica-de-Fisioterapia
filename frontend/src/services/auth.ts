"use client";

import { api } from "./api";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";
//Pega o Token
export function getToken() {
  return Cookies.get("token") || null
}
//Login
export async function handleLogin(email: string, password: string) {
  try {
    const response = await api.post("/session", {
      email,
      password,
    });

    const token = response.data?.token;

    // Validação 
    if (!token) {
      return {
        success: false,
        error: "Credenciais inválidas",
      };
    }

    Cookies.set("token", token, {
      path: "/",
    });

    console.log("token foi salvo:", token);

    return { success: true };
  } catch (err: any) {
    console.log("Error ao tentar fazer Login", err);

    return {
      success: false,
      error:
        err?.response?.data?.message ||
        "Erro ao tentar fazer login",
    };
  }
}
// Cadastro
export async function handleCadastro(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await api.post("/users", {
      name,
      email,
      password,
    });

    console.log("cadastro ok", response.data);

    return { success: true, error: "" };
  } catch (err: any) {
    console.log("Error ao cadastrar", err);

    return {
      success: false,
      error:
        err?.response?.data?.message ||
        "Erro ao cadastrar",
    };
  }
}
// Hook Auth
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    //  autenticação  baseada em existência de token
    setIsAuthenticated(!!token);

    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
}
//Sair/Logout
export function logout() {
  Cookies.remove("token", { path: "/" });

  // melhor que reload 
  window.location.href = "/";
}

