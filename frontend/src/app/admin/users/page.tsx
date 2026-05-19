"use client";

import { api } from "../../../services/api";
import { logout } from "../../../services/auth";
import { useEffect, useState } from "react";
import email from "../../../../public/email.png";
import tres_pontinhos from "../../../../public/tres_pontos_button.png";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Guarda qual menu está aberto
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  async function listarUsuarios() {
    try {
      const response = await api.get("/ursersDetails");
      const data = response.data?.data || response.data;

      setUsers(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    listarUsuarios();
    detalheGeral();
  }, []);

  function userTemAgendamento(userId: string) {
    return appointments.some(
      (appt) => appt.user?.id === userId
    );
  }

  // Abre e fecha o menu do usuário clicado
  function tresPontinhos(userId: string) {
    setMenuOpenId((prevId) =>
      prevId === userId ? null : userId
    );
  }
  

  function deletarUsuario(userId: string) {
    alert("Usuário deletado: " + userId);
  }

  function alterarMarcacao(userId: string) {
    alert("Alterar marcação do usuário: " + userId);
  }


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <p className="p-6 text-gray-500">
        Carregando usuários...
      </p>
    );
  }

  return (
    <div className="w-full p-4 sm:p-10 lg:p-15">

      <h1 className="text-2xl text-black font-bold mb-2 mt-7">
        Usuários
      </h1>

      <p className="text-gray-500">
        Esta é a página de usuários. Aqui você pode gerenciar os usuários do sistema.
      </p>

      {/* INPUT DE PESQUISA */}
      <div className="mt-7 mb-4">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow mt-10">

        <table className="w-full text-sm text-left">

          <thead className="bg-[#E6F7EF] text-gray-600">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Função</th>
              <th className="p-3">Data de entrada</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-gray-50">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-100 transition"
              >

                <td className="p-3 font-medium text-[#0F1720]">
                  {user.name}
                </td>

                <td className="p-3 text-gray-600">
                  {user.email}
                </td>

                <td className="p-3 text-gray-600">
                  {user.role === "ADMIN"
                    ? "Administrador"
                    : "Paciente"}
                </td>

                <td className="p-3 text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("pt-PT")
                    : "Data não disponível"}
                </td>

                <td className="p-3">
                  {userTemAgendamento(user.id) ? (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                      Ativo
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                      Inativo
                    </span>
                  )}
                </td>

                {/* AÇÕES */}
                <td className="p-3">

                  <div className="flex items-center gap-2 relative">

                    {/* EMAIL */}
                    <a
                      href={`mailto:${user.email}?subject=${encodeURIComponent(
                        "Gostaríamos de retomar o contacto - Fisioterapia"
                      )}&body=${encodeURIComponent(
                        `Olá ${user.name},

Esperamos que esteja bem.

Já faz algum tempo desde o nosso último contacto e gostaríamos de saber como tem estado.

Gostaríamos de retomar o contacto e, se fizer sentido para si, agendar uma nova sessão de fisioterapia.

Com os melhores cumprimentos,
Equipa de Fisioterapia`
                      )}`}
                      className="bg-[#E6F7EF] hover:bg-white px-2 py-1 rounded-md transition flex items-center justify-center w-fit"
                    >
                      <Image
                        src={email}
                        alt="Email"
                        width={18}
                        height={18}
                      />
                    </a>

                    {/* 3 PONTOS */}
                    <button
                      onClick={() => tresPontinhos(user.id)}
                      className="cursor-pointer hover:scale-110 transition-all duration-300"
                    >
                      <Image
                        src={tres_pontinhos}
                        alt="Menu"
                        width={25}
                        height={30}
                        className="w-auto h-auto"
                      />
                    </button>

                    {/* MENU */}
                    {menuOpenId === user.id && (
                      <div className="absolute right-0 top-12 bg-white border shadow-lg rounded-lg w-48 z-50 overflow-hidden">

                        <button
                          onClick={() => alterarMarcacao(user.id)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm transition"
                        >
                          ✏️ Alterar marcação
                        </button>

                        <button
                          onClick={() => deletarUsuario(user.id)}
                          className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 text-sm transition"
                        >
                          🗑️ Deletar usuário
                        </button>

                      </div>
                    )}

                  </div>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MOBILE */}
      <div className="sm:hidden mt-6 space-y-4">

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-xl p-4 border"
          >

            <p className="font-semibold text-[#0F1720]">
              {user.name}
            </p>

            <p className="text-sm text-gray-600">
              {user.email}
            </p>

            <p className="text-sm text-gray-600">
              {user.role === "ADMIN"
                ? "Administrador"
                : "Paciente"}
            </p>

            <p className="text-sm text-gray-500">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("pt-PT")
                : "Data não disponível"}
            </p>

            <div className="mt-2">
              {userTemAgendamento(user.id) ? (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                  Ativo
                </span>
              ) : (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                  Inativo
                </span>
              )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}