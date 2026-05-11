"use client";

import { api } from "../../../services/api";
import { logout } from "../../../services/auth";
import { useEffect, useState } from "react";

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

if (loading) {
  return <p className="p-6 text-gray-500">Carregando usuários...</p>;
}

  return (

    <div className="w-full p-4 sm:p-10 lg:p-15">

      <h1 className="text-2xl text-black font-bold mb-2">
        Usuários
      </h1>

      <p className="text-gray-500">
        Esta é a página de usuários. Aqui você pode gerenciar os usuários do sistema.
      </p>

      {/* INPUT DE PESQUISA */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* TABELA DESKTOP */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow mt-10">

        <table className="w-full text-sm text-left">

          <thead className="bg-[#E6F7EF] text-gray-600">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Função</th>
              <th className="p-3">Data de entrada</th>
              <th className="p-3">Status</th>
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

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}