"use client";

import { api } from "../../../services/api";
import { logout } from "../../../services/auth";
import { useEffect, useState } from "react";
import email from "../../../../public/email.png";
import tres_pontinhos from "../../../../public/tres_pontos_button.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { chamarMarcacao, deletarMarcacao } from "./changeandDelete";

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

    //Abre todas as marcacoes antes de excluir na pasta do usuarioADMIN
  const [selectedMarcacoes,setSelectedMarcacoes] = useState<any[]>([])
  const [openModal,setOpenModal] = useState(false)

const [selectedUser,setSelectedUser] = useState< User | null >(null)

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
  
  

 async function AbrirEdicaoDaMarcacao(user: User) {
  setSelectedUser(user);
  setMenuOpenId2(user.id);
}

    //abre as marcacoes ao clicar no botao excluir pra depois escolher qual marcacao quer excluir
  async function handleOpenMarcacoes(userId:User){
    setSelectedUser(userId)
    setOpenModal(true)
  setSelectedMarcacoes([]) // limpa antes
    const marcacoes = await chamarMarcacao(userId.id) 
  setSelectedMarcacoes(marcacoes)
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

    const marcacoesConfirmadas = selectedMarcacoes.filter((marcacoes) => marcacoes.status === "CONFIRMED")

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
              <th className="p-3">Usuário</th>
              <th className="p-3">Função</th>
              <th className="p-3">Data de cadastro</th>
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

                <td className="flex flex-col p-3 ">
                  <p className="text-black capitalize font-bold">{user.name}</p> <p className="font-sm text-gray-400 ">{user.email}</p>
                </td>

                <td>
 <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${user.role === "ADMIN" ? "bg-green-100 text-green-700 "
        : "bg-gray-100 text-gray-600"}`} > {user.role === "ADMIN" ? "Administrador" : "Paciente"}
  </span>
</td>


                <td className="p-3 text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("pt-PT")
                    : "Data não disponível"}
                </td>

                <td className="p-3">
                  {userTemAgendamento(user.id) ? (
                 <div className="inline-flex items-center px-2 py-1 gap-2 rounded text-xs font-bold bg-green-100 text-green-700">
                    <p className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></p>
                    <span>Ativo</span>
                 </div>

                  ) : (
                    <div className="inline-flex items-center px-2 py-1 gap-2 rounded text-xs font-bold bg-green-100 text-red-700">
                    <p className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></p>
                      <span>
                      Inativo
                    </span>
                  </div>
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
                   <div className="absolute right-0 top-12 bg-white border shadow-lg rounded-lg w-48 z-998 overflow-hidden">
                       
                        <button
                          onClick={() => AbrirEdicaoDaMarcacao(user)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm transition"
                        >
                          ✏️ Criar marcação
                        </button>
                          
                        <button
                          onClick={() => handleOpenMarcacoes(user) }
                          className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 text-sm transition"
                        >
                          🗑️ Deletar marcação
                        </button>

                      </div>
                    )}

                    {openModal && (
  <div className="fixed  inset-0 bg-[#E6F7EF] backdrop-blur-sm flex items-center justify-center z-999">
    
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md  shadow-xl">
      
      <h2 className="flex gap-2 text-lg font-bold mb-4 ">
        Marcações do utilizador <p className="bg-[#2BAE66] rounded-md text-white text-sm capitalize p-1.5">{selectedUser?.name}</p>
      </h2>

     {marcacoesConfirmadas.length === 0 ? (
  <p className="text-center text-gray-500 py-10">
    Sem marcações encontradas
  </p>
) : (
  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 pb-1">
    {marcacoesConfirmadas.map((marcacao) => (
      <div
        key={marcacao.id}
        className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-[#2BAE66]/20 bg-white shadow-sm hover:shadow-md transition"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">
          
          {/* ICON */}
          <div className="w-10 h-10 rounded-xl bg-[#2BAE66]/10 flex items-center justify-center text-[#2BAE66] font-bold shrink-0">
            {marcacao.service?.slice(0, 1) || "M"}
          </div>

          {/* TEXT */}
          <div className="flex flex-col min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {marcacao.service}
            </p>

            <p className="text-sm text-gray-500 whitespace-nowrap">
              {new Date(marcacao.scheduledAt).toLocaleString("pt-PT", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">
          
          <span className="text-xs px-3 py-1 rounded-full bg-[#2BAE66]/10 text-[#2BAE66] font-medium">
            agendada
          </span>

          <button
            onClick={ async () => {await deletarMarcacao(marcacao.id)
            setOpenModal(false)
            }
              
            }
            className=" cursor-pointer p-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 active:scale-95 transition"
          >
            🗑️
          </button>
        </div>
      </div>
    ))}
  </div>
)}

        <button
        onClick={() => setOpenModal(false)}
        className=" mt-4 bg-gray-500 text-white  font-semibold px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
      > Fechar
      </button>

    </div>
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
    if (!selectedUser?.id) {
      toast.error("Seleciona um utilizador");
      return;
    }

    if (!form.status || !form.scheduledAt || !form.type) {
      toast.error("Preenche todos os campos");
      return;
    }

    const serviceTypeMap: Record<string, string> = {
      PILATES: "eab56c8b-7612-4cf1-b5cb-4d507d00617b",
      ACUPUNTURA: "5ed3dd87-93cd-4f19-9639-378bd2d305aa",
      VENTOSATERAPIA: "c626ca90-b438-4f59-bcd1-cf8aa16aec9d",
      FISIOTERAPIA: "e7d81ac8-0a59-4a54-97db-db8fd9a2aeec",
    };

    const payload = {
      userId: selectedUser.id, 
      description: form.description,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
      serviceTypeID: serviceTypeMap[form.type],
      type: form.type,
      status: form.status,
    };

    console.log("PAYLOAD ENVIADO:", payload);

    await api.post("/appointments", payload);

    toast.success("Marcação criada com sucesso!");

    setMenuOpenId2(null);
    setSelectedUser(null);
  } catch (err: any) {
    console.log("ERRO BACKEND:", err.response?.data);
    toast.error("Erro ao criar marcação");
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