"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/services/auth";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { api } from "@/services/api";
import { toast } from "react-toastify";

/**
 * 🔥 AGENDAMENTO REAL
 */
interface Agendamento {
  service: "pilates" | "ventosa" | "acupuntura";
  scheduleAt: string; // ISO
}

type ServiceType = "pilates" | "ventosa" | "acupuntura";

export default function AreaDoPaciente() {
  const { loading, isAuthenticated } = useAuth();

  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [servicoSelecionado, setServicoSelecionado] =
    useState<ServiceType>("pilates");

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [horariosLivres, setHorariosLivres] = useState<string[]>([]);

  const horariosPossiveis = [
    "08:00", "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
  ];

  
   //  BUSCAR AGENDAMENTOS
   
  async function loadAppointments() {
    try {
      const res = await api.get("/appointmentsbyuser");

      const lista = res.data;

      if (!Array.isArray(lista)) return;

      setAgendamentos(lista);
console.log(lista)
    } catch (err) {
      toast.error("Erro ao carregar seus agendamentos");
    }
  }

  useEffect(() => {
    if (isAuthenticated) loadAppointments();
  }, [isAuthenticated]);

  /**
   *  QUANDO ESCOLHE O DIA
   */
  function onSelectDay(date: Date | undefined) {
    if (!date) return;

    setDiaSelecionado(date);

    const ocupados = agendamentos.filter((a) => {
      const d = new Date(a.scheduleAt);

      const mesmoDia =
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate();

      const mesmoServico = a.service === servicoSelecionado;

      return mesmoDia && mesmoServico;
    });

    const horariosOcupados = ocupados.map((a) =>
      new Date(a.scheduleAt).toTimeString().slice(0, 5)
    );

    const livres = horariosPossiveis.filter(
      (h) => !horariosOcupados.includes(h)
    );

    setHorariosLivres(livres);
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col items-center p-10 bg-[#E6F7EF]">

      <h1 className="text-2xl font-bold mb-4">
        Minhas Consultas
      </h1>

      {/*  SELEÇÃO DE SERVIÇO */}
      <div className="flex gap-2 mb-5">
        {(["pilates", "ventosa", "acupuntura"] as ServiceType[]).map((s) => (
          <button
            key={s}
            onClick={() => setServicoSelecionado(s)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              servicoSelecionado === s
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* CALENDÁRIO */}
      <Card className="w-fit">
        <CardContent>
          <Calendar
            mode="single"
            selected={diaSelecionado || undefined}
            onSelect={onSelectDay}
            className="cursor-pointer"
          />
        </CardContent>
      </Card>

      {/* HORÁRIOS */}
      {diaSelecionado && (
        <div className="mt-6 w-full max-w-md">

          <h2 className="text-center font-bold">
            {servicoSelecionado.toUpperCase()} -{" "}
            {diaSelecionado.toLocaleDateString("pt-PT")}
          </h2>

          {horariosLivres.length === 0 ? (
            <p className="text-red-600 text-center mt-2">
              Nenhum horário disponível
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {horariosLivres.map((h) => (
                <button
                  key={h}
                  className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md hover:bg-green-700"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}