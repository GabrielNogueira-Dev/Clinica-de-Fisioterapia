"use client";

import { useState } from "react";
import Especialidade from "./agendamento/especialidade";
import Horario from "./agendamento/horario";

export default function Agendamento() {
  const [step, setStep] = useState(1);

  function nextStep() {
    if (step < 3) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

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
        {/* PASSO 1 — Especialidade */}
        {step === 1 && (
         <Especialidade/>
        )}

        {/* PASSO 2 — Horário */}
        {step === 2 && (
          <Horario/>
        )}

        {/* PASSO 3 — Confirmação */}
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
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600"
            >
              Voltar
            </button>
          )}

          {step < 3 && (
            <button
              onClick={nextStep}
              className="px-4 py-2 rounded-lg bg-[#2BAE66] text-white font-semibold"
            >
              Avançar
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
