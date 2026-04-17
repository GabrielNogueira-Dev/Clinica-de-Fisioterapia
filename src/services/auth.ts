import { api } from "./api";
import { LoginData,CadastroData } from "@/types/authTypes";
import { cookies } from "next/headers";

export function login({email, senha}: LoginData) {
  return api.post("/session", { email, senha });
}

export function cadastro({nome, email, senha}: CadastroData) {
  return api.post("/users", { nome, email, senha });
}
