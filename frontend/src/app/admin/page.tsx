"use client";

import { api } from "@/services/api";
import { useAuth, logout } from "@/services/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CalendarCheck,
  UserCheck2,
  UserRoundMinus,
  UsersIcon,
} from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function Admin() {
  const [openAllAppointments, setOpenAllAppointments] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const totalAgendamentos = appointments.length;

  const [mesAberto, setMesAberto] = useState<string | null>(null);

function abrirFecharMes(mes: string) {
  setMesAberto((mesAtual) => mesAtual === mes ? null : mes );
}

  async function detalheAdmin() {
  try {
    const response = await api.get("/me");

    const userData = response.data;

    if (userData.role !== "ADMIN") {
      logout();
      router.replace("/login");
      return;
    }

    setUser(userData);
  } catch (err: any) {
    if (err.response?.status === 401) {
      logout();
      router.replace("/login");
    }
  }
}

useEffect(() => {
  if (user && user.role !== "ADMIN") {
    router.replace("/login");
  }
}, []);

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

  async function detalheUsuarios() {
    try {
      const listaUsuarios = await api.get("/ursersDetails");
      const data = listaUsuarios.data?.data || listaUsuarios.data;
      setUsuarios(data);
      console.log("Lista de usuários!!!!!:", data);
    } catch (err) {
      console.log("Error ao carregar usuários", err);
    }
  }

  const uniqueUsers = Array.from( // uniqueusers nao é total de usuarios, é o total de usuarios com agendamento
    new Map(
      appointments.map((agendamento: any) => [
        agendamento.user.id,
        agendamento.user,])).values());
   // Cria um array de usuários únicos com base nos agendamentos. 
  // Exemplo: [{id: 1, name: "João"}, {id: 2, name: "Maria"}, ...]

  useEffect(() => {
    

    if (isAuthenticated) {
      detalheAdmin();
      detalheGeral();
      detalheUsuarios();
    }
  }, [loading, isAuthenticated]);

  if (loading) return <p>Carregando...</p>;

  function agruparPorMes(usuarios: any[]) {
    //TODOS OS CONFIRMADOS 
  const meses: Record<string, any[]> = {};// Agrupa os agendamentos por mês ex: abril 2026": [...],

  usuarios.forEach((user) => {
    user.appointments
    ?.filter((appt : any) => appt.status === "CONFIRMED")
    .forEach((appt: any) => {
      const data = new Date(appt.scheduledAt);

      const chaveMes = data.toLocaleDateString("pt-PT", {
        month: "long",
        year: "numeric",
      }); //transforma a data em uma string do tipo "abril 2026"

      if (!meses[chaveMes]) {
        meses[chaveMes] = [];
      } // se ainda não existe "maio 2026", cria Exemplo: meses["maio de 2026"] = [];

      meses[chaveMes].push({
        ...appt,
        userName: user.name,
        userEmail: user.email
      });
    }); // retorna um array de agendamentos com o nome do usuário Exemplo: [{id: 1, scheduledAt: "2026-05-10T14:00:00Z", userName: "João"}, ...]
  });

  return meses;
}
// Guarda os agendamentos agrupados por mês para exibir 
const appointmentsByMonth = agruparPorMes(usuarios);

 function agruparPorMesAll(usuarios: any[]) {
  //TODOS OS MESES, INCLUSIVE CANCELADOS E PENDENTES

  const meses: Record<string, any[]> = {};// Agrupa os agendamentos por mês ex: abril 2026": [...],

  usuarios.forEach((user) => {
    user.appointments
    ?.filter((appt: any) => appt.status !== "CONFIRMED")
    .forEach((appt: any) => {
      const data = new Date(appt.scheduledAt);

      const chaveMes = data.toLocaleDateString("pt-PT", {
        month: "long",
        year: "numeric",
      }); //transforma a data em uma string do tipo "abril 2026"

      if (!meses[chaveMes]) {
        meses[chaveMes] = [];
      } // se ainda não existe "maio 2026", cria Exemplo: meses["maio de 2026"] = [];

      meses[chaveMes].push({
        ...appt,
        userName: user.name,
        userEmail: user.email
      });
    }); // retorna um array de agendamentos com o nome do usuário Exemplo: [{id: 1, scheduledAt: "2026-05-10T14:00:00Z", userName: "João"}, ...]
  });

  return meses;
}

 const appointmentsByMonthALL = agruparPorMesAll(usuarios);

  return (
    <div className="w-full p-4 sm:p-10 lg:p-15">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">

        <div className="mt-7">
          <h1 className="text-xl sm:text-2xl text-black font-bold mb-1">
            Painel Admin
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Visão geral dos agendamentos da clínica.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-200 rounded-md h-10 px-3 mt-7">
          <UsersIcon size={20} />
          <p className="text-black font-semibold text-sm sm:text-base ">
            {usuarios.length}
          </p>
        </div>

      </div>

      {/* CARDS */}
      {user ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">

          {/* CARD 1 */}
          <div className="bg-white p-3 sm:p-5 lg:p-6 rounded-xl shadow flex flex-col justify-between gap-2">
            <h2 className="text-gray-500 flex items-center gap-1 text-[11px] sm:text-sm">
              Agendamentos Confirmados <CalendarCheck size={16} className="sm:w-5 sm:h-5" />
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#0F1720]">
              {totalAgendamentos}
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-3 sm:p-5 lg:p-6 rounded-xl shadow flex flex-col justify-between gap-2">
            <h2 className="text-gray-500 flex items-center gap-1 text-[11px] sm:text-sm">
              Clientes com agendamento <UserCheck2 size={16} className="sm:w-5 sm:h-5" />
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#0F1720]">
              {uniqueUsers.length}
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-3 sm:p-5 lg:p-6 rounded-xl shadow flex flex-col justify-between gap-2">
            <h2 className="text-gray-500 flex items-center gap-1 text-[11px] sm:text-sm">
              Clientes sem agendamento <UserRoundMinus size={16} className="sm:w-5 sm:h-5" />
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#0F1720]">
              {usuarios.length - uniqueUsers.length} 
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white p-3 sm:p-5 lg:p-6 rounded-xl shadow flex flex-col justify-between gap-2">
            <h2 className="text-gray-500 flex items-center gap-1 text-[11px] sm:text-sm">
              Taxa de ocupação <CalendarCheck size={16} className="sm:w-5 sm:h-5" />
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#0F1720]">
              {usuarios.length > 0
                ? ((uniqueUsers.length / usuarios.length) * 100).toFixed(0)
                : 0}
              %
            </p>
          </div>

        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
      
{/* LISTA DE AGENDAMENTOS CONFIRMADOS*/}
<div className="mt-10">
  <h1 className="text-black text-lg font-bold mb-4">
    Lista de Agendamentos Confirmados
  </h1>

  {Object.entries(appointmentsByMonth).map(
    ([mes, agendamentos]: any) => (
     
     <div key={mes} className="mb-10">

        {/* HEADER DO MÊS */}
        <button
          onClick={() => abrirFecharMes(mes)}
          className="cursor-pointer w-full flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg mb-3 hover:bg-gray-200 transition"
        >

               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>


          <h2 className="first-letter:uppercase text-md font-bold text-black">
            {mes}
          </h2>

          <span className="text-sm text-gray-500">
            {mesAberto === mes ? "❎" : "✅"}
          </span>
        </button>

        {/* CONTEÚDO DO MÊS */}
        {mesAberto === mes && (
          <>

            {/* DESKTOP TABLE */}
            <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full text-sm text-left">

                <thead className="bg-[#E6F7EF] text-gray-600">
                  <tr className="text-[#6B7280]">
                    <th className="p-3">Paciente</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Especialidade</th>
                    <th className="p-3">Data e Hora</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                  
                <tbody className="bg-gray-50">
                  {agendamentos.map((appt: any) => ( 
                    <tr
                      key={appt.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-3 capitalize font-medium text-[#0F1720]">
                        {appt.userName}
                      </td>

                      <td className="p-3 capitalize font-medium text-[#0F1720]">
                        {appt.userEmail}
                      </td>

                      <td className="p-3 text-gray-600">
                        {appt.serviceType?.name}
                      </td>

                      <td className="p-3 text-gray-600">
                        {new Date(
                          appt.scheduledAt
                        ).toLocaleDateString("pt-PT")}{" "}
                        às{" "}
                        {new Date(
                          appt.scheduledAt
                        ).toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            appt.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="sm:hidden flex flex-col gap-4">

              {agendamentos.map((appt: any) => (
                <div
                  key={appt.id}
                  className="bg-white shadow rounded-xl p-4 border"
                >

                  <p className="font-semibold text-[#0F1720]">
                   Paciente: {appt.userName}
                  </p>

                    <p className="font-semibold text-[#0F1720]">
                    Email: {appt.userEmail}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                   <span className="text-black font-semibold">Serviço:</span> {appt.serviceType?.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                   <span className="text-black font-semibold">Horário: </span>{new Date(
                      appt.scheduledAt
                    ).toLocaleDateString("pt-PT")}{" "}
                    às{" "}
                    {new Date(
                      appt.scheduledAt
                    ).toLocaleTimeString("pt-PT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-md text-xs font-semibold ${
                      appt.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status}
                  </span>

                </div>
              ))}

            </div>

          </>
        )}

      </div>
    )
  )}
</div>

  <button className="flex justify-center items-center cursor-pointer text-black text-lg font-bold mb-4" onClick={() => setOpenAllAppointments(prev => !prev)}> 
   Lista de Agendamentos Cancelados
  </button>

  {openAllAppointments && Object.entries(appointmentsByMonthALL).map(
    ([mes, agendamentos]: any) => (
      
        <div key={mes} className="mb-10">

        {/* HEADER DO MÊS */}
        <button
          onClick={() => abrirFecharMes(mes)}
          className="cursor-pointer w-full flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg mb-3 hover:bg-gray-200 transition"
        >

               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>


          <h2 className="first-letter:uppercase text-md font-bold text-black">
            {mes}
          </h2>

          <span className="text-sm text-gray-500">
            {mesAberto === mes ? "❎" : "✅"}
          </span>
        </button>

        {/* CONTEÚDO DO MÊS */}
        {mesAberto === mes && (
          <>

            {/* DESKTOP TABLE */}
            <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full text-sm text-left">

                <thead className="bg-[#E6F7EF] text-gray-600">
                  <tr className="text-[#6B7280]">
                    <th className="p-3">Paciente</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Especialidade</th>
                    <th className="p-3">Data e Hora</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                  
                <tbody className="bg-gray-50">
                  {agendamentos.map((appt: any) => ( 
                    <tr
                      key={appt.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-3 capitalize font-medium text-[#0F1720]">
                        {appt.userName}
                      </td>

                      <td className="p-3 capitalize font-medium text-[#0F1720]">
                        {appt.userEmail}
                      </td>

                      <td className="p-3 text-gray-600">
                        {appt.serviceType?.name}
                      </td>

                      <td className="p-3 text-gray-600">
                        {new Date(
                          appt.scheduledAt
                        ).toLocaleDateString("pt-PT")}{" "}
                        às{" "}
                        {new Date(
                          appt.scheduledAt
                        ).toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            appt.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="sm:hidden flex flex-col gap-4">

              {agendamentos.map((appt: any) => (
                <div
                  key={appt.id}
                  className="bg-white shadow rounded-xl p-4 border"
                >

                  <p className="font-semibold text-[#0F1720]">
                   Paciente: {appt.userName}
                  </p>

                    <p className="font-semibold text-[#0F1720]">
                    Email: {appt.userEmail}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                   <span className="text-black font-semibold">Serviço:</span> {appt.serviceType?.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                   <span className="text-black font-semibold">Horário: </span>{new Date(
                      appt.scheduledAt
                    ).toLocaleDateString("pt-PT")}{" "}
                    às{" "}
                    {new Date(
                      appt.scheduledAt
                    ).toLocaleTimeString("pt-PT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-md text-xs font-semibold ${
                      appt.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status}
                  </span>

                </div>
              ))}

            </div>

          </>
        )}

      </div>

    )
    )}

</div>


  );
}