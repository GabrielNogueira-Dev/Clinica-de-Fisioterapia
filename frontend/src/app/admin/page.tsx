"use client";

import { api } from "@/services/api";
import { useAuth, logout } from "@/services/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CalendarCheck, User, UserCheck2, UserPlus, UserRoundMinus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function Admin() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const totalAgendamentos = appointments.length;

  // buscar dados do usuário logado
  async function detalheAdmin() {
    try {
      const response = await api.get("/me");
      setUser(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        logout();
      }
    }
  }

  // buscar agendamentos
  async function detalheGeral() {
    try {
      const response = await api.get("/appointments");

      const data = response.data?.data || response.data;

      const confirmed = data.filter(
        (item: any) => item.status === "CONFIRMED"
      );

      setAppointments(confirmed);
    } catch (err) {
      console.log("Erro ao carregar agendamentos", err);
    }
  }

// LÓGICA DE USUÁRIOS (BASEADA EM APPOINTMENTS)

//  1. Pega todos os usuários que aparecem nos agendamentos,total de usuario com agendamento marcado (sem duplicacao por id)
const uniqueUsers = Array.from( new Map( appointments.map((agendamento: any) => [
      agendamento.user.id, // chave única (evita duplicação por ID)
      agendamento.user     // valor (objeto do usuário)
    ])).values() );

const totalUsuarioSemAgendamento = uniqueUsers.length;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }

    if (isAuthenticated) {
      detalheAdmin();
      detalheGeral();
    }
  }, [loading, isAuthenticated]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="w-full p-15">
      <div className="mb-10">
        <h1 className="text-2xl text-black font-bold mb-2">
          Painel Admin
        </h1>
        <p>Visão geral dos agendamentos da clínica.</p>
      </div>

      {user ? (
        <div className="grid grid-cols-4 gap-6">

          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 flex gap-2 items-center">
              Agendamentos Confirmados <CalendarCheck size={20} />
            </h2>
            <p className="text-2xl font-bold text-[#0F1720] mt-2">
              {totalAgendamentos}
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 flex gap-2 items-center">
             clientes com agendamento marcado <UserCheck2 size={20} />
            </h2>
            <p className="text-2xl font-bold text-[#0F1720] mt-2">
              {uniqueUsers.length}
            </p>
          </div>

          {/* CARD 3 (extra útil) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 flex gap-2 items-center">
              Clientes sem agendamento <UserRoundMinus size = {20} />
            </h2>
            <p className="text-2xl font-bold text-[#0F1720] mt-2">
             {totalUsuarioSemAgendamento}
            </p>
          </div>

        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}