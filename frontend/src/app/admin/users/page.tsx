"use client";

import { api } from "../../../services/api";
import { logout } from "../../../services/auth";
import { useEffect, useState } from "react";
import email from "../../../../public/email.png";
import tres_pontinhos from "../../../../public/tres_pontos_button.png";
import Image from "next/image";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface PutedAppointment {
   status: "CONFIRMED" | "CANCELLED" ,
  scheduledAt: string;
  description: string;
  type: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Guarda qual menu está aberto
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [menuOpenId2, setMenuOpenId2] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<PutedAppointment>({
    status: "CONFIRMED",
    scheduledAt: "",
    description: "",
    type: "",
  });

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
      if(data.role === "ADMIN"){return null}

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
  
  

  async function AbrirEdicaoDaMarcacao(userId: string) {
   menuOpenId2 === userId ? setMenuOpenId2(null) : setMenuOpenId2(userId);
   setEditId(userId);
   
  }
  function deletarUsuario(userId: string) {
    alert("Usuário deletado: " + userId);
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
      <div className="hidden sm:block overflow-visible bg-white rounded-xl shadow mt-10">

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
                  className="relative z-50 cursor-pointer hover:scale-110 transition-all duration-300"
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
                   <div className="absolute right-0 top-12 bg-white border shadow-lg rounded-lg w-48 z-999 overflow-hidden">
                       
                        <button
                          onClick={() => AbrirEdicaoDaMarcacao(user.id)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm transition"
                        >
                          ✏️ Criar marcação
                        </button>
                          
                        <button
                          onClick={() => deletarUsuario(user.id)}
                          className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 text-sm transition"
                        >
                          🗑️ Deletar marcação
                        </button>

                      </div>
                    )}

                   {menuOpenId2 === user.id && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-3">
      
      <h2 className="text-lg font-bold">
        Criar Marcação de {user.name}
      </h2>

      <select
  className="w-full border p-2 rounded"
  value={form.status}
  onChange={(e) =>
    setForm({ ...form, status: e.target.value as any })
  }
>
  <option value="CONFIRMED">CONFIRMED</option>
  <option value="CANCELLED">CANCELLED</option>
</select>

      <input
      type="datetime-local"
      className="w-full border p-2 rounded"
      value={form.scheduledAt}
      onChange={(e) =>
        setForm({ ...form, scheduledAt: e.target.value })
      }
    />

      <input
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

        <select
  className="w-full border p-2 rounded"
  value={form.type}
  onChange={(e) =>
    setForm({ ...form, type: e.target.value })
  }
>
  <option value="">Selecione o tipo</option>
  <option value="PILATES">PILATES</option>
  <option value="ACUPUNTURA">ACUPUNTURA</option>
  <option value="VENTOSATERAPIA">VENTOSATERAPIA</option>
</select>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setMenuOpenId2(null)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancelar
        </button>

        <button
          //enviar form para o backend
        
          onClick={async () => {
  try {
    if (!editId) return;

    if (!form.status || !form.scheduledAt || !form.type) {
      toast.error("Preenche todos os campos");
      return;
    }

    
const serviceTypeMap: Record<string, string> = {
  PILATES: "eab56c8b-7612-4cf1-b5cb-4d507d00617b",
  ACUPUNTURA: "5ed3dd87-93cd-4f19-9639-378bd2d305aa",
  VENTOSATERAPIA: "c626ca90-b438-4f59-bcd1-cf8aa16aec9d",
};

const payload = {
  description: form.description,
  scheduledAt: new Date(form.scheduledAt).toISOString(),
  serviceTypeID: serviceTypeMap[form.type],
  type: form.type,
  status: form.status,
};


    console.log("PAYLOAD ENVIADO:", payload);

    await api.post(`/appointments/`, payload);

    toast.success("Atualizado com sucesso!");

    setMenuOpenId2(null);
  } catch (err: any) {
    console.log("ERRO BACKEND:", err.response?.data);
    toast.error("Erro ao atualizar marcação");
  }
}}

          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Salvar
        </button>
      </div>

    </div>
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