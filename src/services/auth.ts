"use client"
import { api } from "./api";
import { LoginData,CadastroData } from "@/types/authTypes";
import  Cookies  from "js-cookie";


export async function handleLogin(email:string,password:string,lembrar:boolean) {
  try {
    const data = {
      email: email,
      password: password
    };

    const response = await api.post("/session", data);

    const token = response.data.token;

    Cookies.set("TOKEN: ", token, {
      expires: lembrar ? 60 : 1, //se lembrar senha fica por 60 dias senao apenas 1 dia fica salvo depois expira
      path: "/"
    });

    console.log("token foi salvo: ", token);

    return { success: true, error: "" };

  } catch (err) {
    console.log("Error ao tentar fazer Login", err);
    return { success: false, error: "Erro ao tentar fazer login" };
  }
}

 export async function handleCadastro(name:string,password:string,email:string) {
  try {
    const data = {
      name: name,
      email: email,
      password: password
    };
console.log("enviando: ", data)
    const response = await api.post("/users", data);

    console.log("cadastro ok", response.data);

    return { success: true, error: "" };

  } catch (err) {
    console.log("Error ao cadastrar", err);
    return { success: false, error: "Erro ao cadastrar" };
  }
}