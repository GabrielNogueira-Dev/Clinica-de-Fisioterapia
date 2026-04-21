"use client";

import { useState } from "react";
import Especialidade from "./agendamentos/especialidade";
import DataHora from "../components/agendamentos/dataehora";
import { useAuth } from "@/services/auth";

export default function Agendamento() {
  const { isAuthenticated, loading } = useAuth();
  const [step, setStep] = useState(1);

  const [especialidade,setEspecialidade] = useState("")

  function nextStep() {
    if (step < 3) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  // Enquanto verifica o cookie
  if (loading) {
    return (
    <div className="mt-10 mb-10 flex flex-col items-center justify-center w-full min-h-[60vh] px-6">
  
  <div className=" mt-2 mb-2 bg-white shadow-md p-10 max-w-md w-full text-center animate-fadeIn">
    
    {/* Ícone animado */}
    <div className="mt-2 w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#E6F7EF]">
      <div className="w-7 h-7 border-4 border-[#2BAE66] border-t-transparent rounded-full animate-spin"></div>
    </div>

    {/* Texto */}
    <p className=" mt-2 mb-2 text-lg font-semibold text-[#0F1720]">
      Carregando seu agendamento...
    </p>

  </div>

</div>

    );
  }

  // Se NÃO estiver logado
  if (!isAuthenticated) {
    return (
   <div className=" mt-10 mb-10 flex flex-col items-center justify-center w-full min-h-[60vh] px-6">
  
  <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-10 max-w-md w-full text-center animate-fadeIn">
    
    {/* Ícone */}
    <div className="mt-2 w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#E6F7EF]">
      <span className="text-[#2BAE66] text-3xl">🔒</span>
    </div>

    {/* Título */}
    <h2 className="text-2xl font-bold text-[#0F1720]">
      Login necessário
    </h2>

    {/* Texto */}
    <p className="text-[#6B7280] mt-3 leading-relaxed mb-5">
      Para agendar sua consulta, você precisa acessar sua conta na Área do Paciente.
    </p>

    {/* Botão para direcionar */}
   
   <div className="mb-5">
     <a
  href="#Area-do-paciente"
  className="
    mt-10 w-full max-w-xs 
    bg-[#2BAE66] text-white font-semibold 
    py-3.5 px-6 rounded-lg 
    shadow-md shadow-[#2BAE66]/20 
    hover:bg-[#249a59] hover:shadow-lg 
    transition-all duration-300 
    text-center p-1.5
  "
>
  Fazer Login
</a>
   </div>


  </div>

</div>

    );
  }

  // Se estiver logado → mostra o fluxo de agendamento
  return (
    <div className="flex flex-col w-full">
      {/* Texto explicativo */}
      <section className="flex flex-col w-full p-2">
        <nav
          id="Agendamento"
          className="flex flex-col w-full text-center justify-center items-center mt-15"
        >
          <h1 className="text-[#0F1720] font-bold md:text-2xl">
            Agendar Consulta
          </h1>
          <span className="mt-5 text-[#6B7280] font-medium">
            Siga os passos abaixo para selecionar o serviço desejado e o melhor
            horário para você.
          </span>
        </nav>
      </section>

      {/* Stepper Dinâmico */}
      <section className="flex justify-center mt-10">
        <div className="flex items-center gap-4">
          {/* PASSO 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
                ${
                  step >= 1
                    ? "bg-[#2BAE66] text-white border-[#2BAE66]"
                    : "border-gray-300 text-gray-400"
                }`}
            >
              1
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 1 ? "text-[#2BAE66]" : "text-gray-400"
              }`}
            >
              Especialidade
            </span>
          </div>

          <div
            className={`h-1 w-10 ${
              step >= 2 ? "bg-[#2BAE66]" : "bg-gray-300"
            }`}
          ></div>

          {/* PASSO 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
                ${
                  step >= 2
                    ? "bg-[#2BAE66] text-white border-[#2BAE66]"
                    : "border-gray-300 text-gray-400"
                }`}
            >
              2
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 2 ? "text-[#2BAE66]" : "text-gray-400"
              }`}
            >
              Horário
            </span>
          </div>

          <div
            className={`h-1 w-10 ${
              step >= 3 ? "bg-[#2BAE66]" : "bg-gray-300"
            }`}
          ></div>

          {/* PASSO 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
                ${
                  step === 3
                    ? "bg-[#2BAE66] text-white border-[#2BAE66]"
                    : "border-gray-300 text-gray-400"
                }`}
            >
              3
            </div>
            <span
              className={`text-xs mt-1 ${
                step === 3 ? "text-[#2BAE66]" : "text-gray-400"
              }`}
            >
              Confirmação
            </span>
          </div>
        </div>
      </section>

      {/* CONTEÚDOS DOS PASSOS */}
      <section className="flex flex-col w-full justify-center items-center mt-10 gap-5">
        {step === 1 && <Especialidade />}
        {step === 2 && <DataHora />}
        {step === 3 && (
          <div className="text-center text-[#0F1720] font-medium">
            <h3 className="text-xl">Confirme sua consulta</h3>
            <p className="text-[#6B7280] mt-2">
              Revise os dados e finalize o agendamento.
            </p>
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex justify-between w-[70%] mt-10">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="cursor-pointer px-4 py-2 rounded-lg border mb-5 border-gray-300 text-gray-600"
            >
              Voltar
            </button>
          )}

          {step < 3 && (
            <button
              onClick={nextStep}
              className="cursor-pointer px-4 py-2 rounded-lg mb-5 bg-[#2BAE66] text-white font-semibold"
            >
              Avançar
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
