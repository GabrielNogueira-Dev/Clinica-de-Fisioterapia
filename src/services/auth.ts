"use client"

import { api } from "./api";
import  Cookies  from "js-cookie";
import { useState,useEffect } from "react";

export async function handleLogin(email:string,password:string,lembrar:boolean) {
  
  try {
    const data = {
      email: email,
      password: password,
      lembrar: lembrar
    };

    const response = await api.post("/session", data);

    const token = response.data.token;

    Cookies.set("token", token, {
      expires: lembrar ? 60 : undefined, //se lembrar senha fica por 60 dias senao apenas 1 dia fica salvo depois expira
      path: "/"
    });
      window.location.reload()
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

export function useAuth(){
   const [isAuthenticated,setIsAuthenticated] = useState(false)
   const [loading,setLoading] = useState(true)

   useEffect(()=> {
    const token = Cookies.get("token")
    setIsAuthenticated(!!token) //O que for diferente de token é verdadeiro ou seja esta autenticado
    setLoading(false) // acaba com o loading
    

   },[])

        return {isAuthenticated, loading}
}

export function logout(){
  Cookies.remove("token", {path:"/"});
  window.location.reload();
}