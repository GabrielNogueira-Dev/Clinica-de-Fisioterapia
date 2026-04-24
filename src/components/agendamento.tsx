"use client";

import { useState } from "react";
import Especialidade from "./agendamentos/especialidade";
import DataHora from "../components/agendamentos/dataehora";
import { useAuth } from "@/services/auth";
import { api } from "@/services/api";

import {toast} from "react-toastify"

export default function Agendamento() {
  const { isAuthenticated, loading } = useAuth();

  const [step, setStep] = useState(1);

  // ESTADOS DO AGENDAMENTO
  const [especialidade, setEspecialidade] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");


  function nextStep() {
    if (step < 3) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  async function handleConfirmar() {
    try {
      await api.post("/appointments", {
        description: "Agendamento de sessão",
        scheduledAt: `${dataSelecionada}T${horarioSelecionado}:00Z`,
        serviceTypeID: "ea8e1243-4bc5-4d3a-9db1-aeddcccdc2c2",
        type: especialidade,
        status: "CONFIRMED",
      });
      
      toast.success("Agendamento confirmado!")
    } catch (err) {
      console.log(err);
      toast.error("Erro ao agendar!")
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (!isAuthenticated) return <div className=" mt-10 mb-10 flex flex-col items-center justify-center w-full min-h-[60vh] px-6">
  
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

</div>;

  return (
    <div className="flex flex-col w-full">

      {/* STEPPER */}
      <section className="flex justify-center mt-10">
        <div className="flex items-center gap-4">

          {/* PASSO 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
              ${step >= 1 ? "bg-[#2BAE66] text-white border-[#2BAE66]" : "border-gray-300 text-gray-400"}`}>
              1
            </div>
            <span className={`text-xs mt-1 ${step >= 1 ? "text-[#2BAE66]" : "text-gray-400"}`}>
              Especialidade
            </span>
          </div>

          <div className={`h-1 w-10 ${step >= 2 ? "bg-[#2BAE66]" : "bg-gray-300"}`}></div>

          {/* PASSO 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
              ${step >= 2 ? "bg-[#2BAE66] text-white border-[#2BAE66]" : "border-gray-300 text-gray-400"}`}>
              2
            </div>
            <span className={`text-xs mt-1 ${step >= 2 ? "text-[#2BAE66]" : "text-gray-400"}`}>
              Horário
            </span>
          </div>

          <div className={`h-1 w-10 ${step >= 3 ? "bg-[#2BAE66]" : "bg-gray-300"}`}></div>

          {/* PASSO 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold
              ${step === 3 ? "bg-[#2BAE66] text-white border-[#2BAE66]" : "border-gray-300 text-gray-400"}`}>
              3
            </div>
            <span className={`text-xs mt-1 ${step === 3 ? "text-[#2BAE66]" : "text-gray-400"}`}>
              Confirmação
            </span>
          </div>

        </div>
      </section>

      {/* CONTEÚDOS */}
      <section id="Agendamento"
       className="flex flex-col w-full justify-center items-center mt-10 gap-5">

        {step === 1 && (
          <Especialidade setEspecialidade={setEspecialidade} />
        )}

        {step === 2 && (
          <DataHora
            setDataSelecionada={setDataSelecionada}
            setHorarioSelecionado={setHorarioSelecionado}
          
          />
        )}

        {step === 3 && (
      <div className="text-center text-[#0F1720] font-medium 
                bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

  {/* Título */}
  <h3 className=" mb-2 text-2xl font-bold flex items-center justify-center gap-2 text-[#0F1720]">
    🗓️ Confirme sua consulta
  </h3>

  {/* Informações */}
  <div className="mt-6 space-y-3 text-[16px]">
    <p>
      <span className="font-bold text-[#2BAE66]">Especialidade:</span> {especialidade}
    </p>
    <p>
      <span className="font-bold text-[#2BAE66]">Data:</span> {dataSelecionada}
    </p>
    <p>
      <span className="font-bold text-[#2BAE66]">Horário:</span> {horarioSelecionado}
    </p>
  </div>

  {/* Botão */}
  <div >
    <button
      onClick={handleConfirmar}
      className=" cursor-pointer
        mt-2 p-3 rounded-lg 
        bg-[#2BAE66] hover:bg-[#249a59] 
        text-white font-semibold text-lg
        shadow-md shadow-[#2BAE66]/30 
        transition-all duration-300
      "
    >
      Confirmar Agendamento
    </button>
  </div>
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