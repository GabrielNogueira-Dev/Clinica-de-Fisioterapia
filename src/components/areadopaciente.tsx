"use client";

import { api } from "@/services/api";
import { login,cadastro } from "../services/auth";
import { useState } from "react";
import  Cookies  from "js-cookie";


export default function AreaDoPaciente() {


const [nome,setNome] = useState("")
const [emailCadastro,setEmailCadastro] = useState("")
const [telefone,setTelefone] = useState("")
const [senhaCadastro,setSenhaCadastro] = useState("")
const [email,setEmail] = useState("")
const [senha,setSenha] = useState("")


async function handleLogin() {
  try {
    const data = {
      email: email,
      password: senha
    };

    const response = await api.post("/session", data);

    const token = response.data.token;

    Cookies.set("token", token, {
      expires: 60,
      path: "/"
    });

    console.log("token salvo", token);

    return { success: true, error: "" };

  } catch (err) {
    console.log("Error ao tentar fazer Login", err);
    return { success: false, error: "Erro ao tentar fazer login" };
  }
}

 async function handleCadastro() {
  try {
    const data = {
      name: nome,
      email: emailCadastro,
      password: senhaCadastro
    };
console.log("enviando", data)
    const response = await api.post("/users", data);

    console.log("cadastro ok", response.data);

    return { success: true, error: "" };

  } catch (err) {
    console.log("Error ao cadastrar", err);
    return { success: false, error: "Erro ao cadastrar" };
  }
}


  return (
    <div
      id="Area-do-paciente"
      className="bg-[#E6F7EF] mt-10 pb-20 w-full mx-auto px-2"
    >
      <nav className="flex flex-col items-center justify-center py-10">
        <h1 className="text-[#0F1720] text-2xl font-bold text-center py-10">
          Área do Paciente
        </h1>
        <span className="flex w-full max-w-xl text-center items-center justify-center text-[#6B7280]">
          Acesse sua conta para gerenciar suas consultas ou cadastre-se para
          realizar seu primeiro agendamento.
        </span>
      </nav>

      <nav className="flex flex-col md:flex-row md:w-[70%] sm:w-[80%] p-8 bg-white rounded-md shadow-md mx-auto md:items-start sm:items-center sm:justify-center">
        {/* Esquerda */}
        <section className="flex flex-col w-full md:w-1/2 md:items-start">
          <h2 className="font-bold text-xl mb-5 text-[#0F1720]">Já sou paciente</h2>

          <label 
          htmlFor="login-email" className="font-medium text-[#0F1720]">
            E-mail
          </label>
          <input
            id="login-email"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="seu@email.com"
            type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="login-senha" className="font-medium mt-5 text-[#0F1720]">
            Senha
          </label>
          <input
            id="login-senha"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="*******"
            type="password"
            value={senha} onChange={(e) => setSenha(e.target.value)}
          />

          {/* Lembrar-me e Esqueci minha senha */}
          <section className="flex flex-row w-full justify-between items-center mt-3">
            <div className="flex flex-row w-full justify-between items-center">
              <nav>
                <input type="checkbox" id="lembrar" className="mr-2" />
                <label htmlFor="lembrar" className="text-sm text-[#6B8280]">
                  Lembrar-me
                </label>
              </nav>
              <nav>
                <a href="#" className="text-sm text-[#2BAE66] ml-auto">
                  Esqueci minha senha
                </a>
              </nav>
            </div>
          </section>

          <div className="flex text-center items-center justify-center w-full">
            <button onClick={handleLogin}
             className="w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#2BAE66] text-white cursor-pointer">
              Entrar na conta
            </button>
          </div>
        </section>

        {/* Linha de separação vertical */}
        <div className="hidden md:block w-px bg-gray-300 mx-8 self-stretch"></div>

        {/* Direita */}
        <section className="flex flex-col w-full md:w-1/2 justify-center md:items-start">
          <h2 className="text-[#0F1720] font-bold text-xl mb-5 mt-10 md:mt-0">
            Novo por aqui?
          </h2>

          <label htmlFor="cad-nome" className="font-medium text-[#0F1720]">
            Nome 
          </label>
          <input
            id="cad-nome"
            className="px-3 w-full py-2 mt-2 mb-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="Ex: Maria Joaquina Silva"
            type="text"
            value={nome} onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="cad-email" className="font-medium text-[#0F1720]">
            E-mail
          </label>
          <input
            id="cad-email"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="Ex: maria@email.com"
            type="email"
            value={emailCadastro} onChange={(e) => setEmailCadastro(e.target.value)}
          />

          {/* Telefone + Senha */}
          <section className="flex flex-col md:flex-row w-full gap-6 mt-5">
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="cad-telefone" className="font-medium text-[#0F1720]">
                Telefone
              </label>
              <input
                id="cad-telefone"
                className="mt-2 px-3 w-full max-w-xs py-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                type="text"
                placeholder="(00) 00000-0000"
                value={telefone} onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="cad-senha" className="font-medium text-[#0F1720]">
                Senha
              </label>
              <input
                id="cad-senha"
                className="mt-2 px-3 w-full max-w-xs py-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                type="password"
                placeholder="*******"
                value={senhaCadastro} onChange={(e) => setSenhaCadastro(e.target.value)}
              />
            </div>
          </section>

          <div className="flex text-center items-center justify-center w-full">
            <button onClick={handleCadastro}
             className="text-[#0F1720] w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#b6b8ba] cursor-pointer ">
              Criar minha conta
            </button>
          </div>
        </section>
      </nav>
    </div>
  );
}
