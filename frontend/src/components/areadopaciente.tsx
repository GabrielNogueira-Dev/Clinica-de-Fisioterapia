"use client";

import { useEffect, useState } from "react";
import { handleLogin, handleCadastro, useAuth } from "@/services/auth";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

// formato que uso no FRONT 
export interface ItemProps {
  service: string;
  scheduledAt: string;
  id: string;
}

// formato bruto da minha API
export interface Appointment {
  id: string;
  description: string;
  scheduledAt: string;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";

  serviceType: {
    id: string;
    name: string | null;
    banner: string | null;
    type: string | null;
  };

  user: {
    id: string;
    name: string;
  };

  type?: string; 
}

export default function AreaDoPaciente() {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // LOGIN / CADASTRO
  const [nome, setNome] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

 const onLogin = async () => {
  const result = await handleLogin(email,senha);

  if (!result.success) {
    toast.error(result.error || "Falha no login");
    return;
  }
  router.push("/");
  window.location.reload()
};

   const onCadastro = async () => {
  // 1. validação ANTES de chamar API
  const senhaForte = /^(?=.*[A-Z]).{6,}$/;
  if (senhaCadastro.length < 6 || !senhaForte.test(senhaCadastro)) {
    return toast.error(
      "A senha deve ter no mínimo 6 caracteres e uma letra maiúscula"
    );
  }
  // 2. chama API só se estiver tudo válido
  const result = await handleCadastro(
    nome,
    emailCadastro,
    senhaCadastro
  );

  if (!result.success) {
    return toast.error("Falha ao cadastrar e-mail/senha");
  }
  toast.success("Cadastro realizado com sucesso!");
};


  // AGENDAMENTOS
  const [agendamentos, setAgendamentos] = useState<ItemProps[]>([]);
 
 async function loadAppointments() {
    try {
      const response = await api.get("/appointmentsbyuser");

      const lista: Appointment[] = response.data?.data || response.data;

      console.log("API:", lista);

      const formatado: ItemProps[] = lista.map((item) => ({
        service:
          item.type || item.serviceType?.name || "Desconhecido",
        scheduledAt: item.scheduledAt, id: item.id
      }));

      console.log("FORMATADO:", formatado);

      setAgendamentos(formatado);
    } catch (err) {
      toast.error("Erro ao carregar seus agendamentos");
      console.error(err);
    }
  }

  async function deleteAppointments(id:string){
    try{

      await api.delete(`/appointments/${id}`)
      toast.success("Agendamento cancelado")
      loadAppointments()

    }catch(err){
    toast.error("Error ao tentar deletar marcação"+ err)
    console.log(err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) loadAppointments();
  }, [isAuthenticated]);

  //botao para clicar e aparecer agendamentos
const [clicked,setClicked] = useState(false)
const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      {!isAuthenticated ? (
        // LOGIN + CADASTRO
         <div
          id="Area-do-paciente"
          className="bg-[#E6F7EF] mt-10 pb-20 w-full mx-auto px-2 "
        >
          <nav className="flex flex-col items-center justify-center py-10">
            <h1 className="text-[#0F1720] text-2xl font-bold text-center py-10">
              Área do Paciente
            </h1>
            <span className="flex w-full max-w-xl text-center items-center justify-center text-[#6B7280]">
              Acesse sua conta para gerenciar suas consultas ou cadastre-se para
              realizar seu primeiro agendamento.
            </span>
          </nav>

          <nav className="flex flex-col md:flex-row md:w-[70%] sm:w-[80%] p-8 bg-white rounded-md shadow-md mx-auto md:items-start sm:items-center sm:justify-center">

            {/* LOGIN */}
            <section className="flex flex-col w-full md:w-1/2 md:items-start">
              <h2 className="font-bold text-xl mb-5 text-[#0F1720]">Login</h2>

              <label htmlFor="login-email" className="font-medium text-[#0F1720]">
                E-mail
              </label>
              <input
                id="login-email"
                className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                placeholder="seu@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="login-senha" className="font-medium mt-5 text-[#0F1720]">
                Senha
              </label>
              <input
                id="login-senha"
                className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                placeholder="*******"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <section className="flex flex-row w-full justify-between items-center mt-3">
                <div className="flex flex-row w-full justify-between items-center">
                  <nav>
                    <input
                      type="checkbox"
                      id="lembrar"
                      className="mr-2"
                      checked={lembrar}
                      onChange={(e) => setLembrar(e.target.checked)}
                    />
                    <label htmlFor="lembrar" className="text-sm text-[#6B8280]">
                      Lembrar-me
                    </label>
                  </nav>
                  <nav>
                    <a href="#" className="text-sm text-[#2BAE66] ml-auto">
                      Esqueci minha senha
                    </a>
                  </nav>
                </div>
              </section>

              <div className="flex text-center items-center justify-center w-full">
                <button
                  onClick={onLogin}
                  className="w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#2BAE66] text-white cursor-pointer"
                >
                  Entrar na conta
                </button>
              </div>
            </section>

            {/* divisor */}
            <div className="hidden md:block w-px bg-gray-300 mx-8 self-stretch"></div>

            {/* CADASTRO */}
            <section className="flex flex-col w-full md:w-1/2 justify-center md:items-start">
              <h2 className="text-[#0F1720] font-bold text-xl mb-5 mt-10 md:mt-0">
                Cadastre-se
              </h2>

              <label htmlFor="cad-nome" className="font-medium text-[#0F1720]">
                Nome
              </label>
              <input
                id="cad-nome"
                className="px-3 w-full py-2 mt-2 mb-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                placeholder="Ex: Maria Joaquina Silva"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label htmlFor="cad-email" className="font-medium text-[#0F1720]">
                E-mail
              </label>
              <input
                id="cad-email"
                className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                placeholder="Ex: maria@email.com"
                type="email"
                value={emailCadastro}
                onChange={(e) => setEmailCadastro(e.target.value)}
              />

              <section className="flex flex-col md:flex-row w-full gap-6 mt-5">
                <div className="flex flex-col w-full md:w-full">
                  <label htmlFor="cad-senha" className="font-medium text-[#0F1720]">
                    Senha
                  </label>
                  <input
                    id="cad-senha"
                    className="mt-2 px-3 w-full py-2 font-semibold text-[14px] text-[#6B7280] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
                    type="password"
                    placeholder="*******"
                    value={senhaCadastro}
                    onChange={(e) => setSenhaCadastro(e.target.value)}
                  />
                </div>
              </section>

              <div className="flex text-center items-center justify-center w-full">
                <button
                  onClick={onCadastro}
                  className="text-[#0F1720] w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#b6b8ba] cursor-pointer "
                >
                  Criar minha conta
                </button>
              </div>
            </section>
          </nav>
        </div>
      ) : (
        // ÁREA AUTENTICADA (mantive tua estrutura)
        <div id="Area-do-paciente" className="flex flex-col items-center justify-center w-full p-12 bg-[#E6F7EF]">
          <h1 className="mb-3 font-bold text-black md:text-2xl sm:text-xl">
            Minhas consultas 
          </h1>
        <div className="flex mt-3 mb-4 gap-5">
            <button
  onClick={() => setClicked(prev => !prev)}
  className="flex items-center bg-[#2BAE66] text-white px-4 py-2 rounded-md mb-4 cursor-pointer"
>
  {clicked ? " Fechar" : "🗓️ Ver agendamentos"}
        
</button>
         
       </div>

      {clicked &&
  agendamentos.map((item, index) => {
    const isOpen = expandedIndex === index;

    return (
      <div
        key={index}
        onClick={() =>
          setExpandedIndex(isOpen ? null : index)
        }
        className="
          w-full max-w-xl
          bg-white
          border border-[#e5e7eb]
          rounded-xl
          shadow-sm
          hover:shadow-lg
          transition-all duration-300
          cursor-pointer
          overflow-hidden mb-3
        "
      >
        {/* HEADER CARD */}
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">
              Serviço 
            </span>
            <span className="font-bold text-[#0F1720]">
              {item.service}
            </span>
            
          </div>

          <div className="text-[#2BAE66] font-bold text-sm">
            {isOpen ? "🙉" : "🙈"} 
            <button
  onClick={(e) => { e.stopPropagation(); 
  deleteAppointments(item.id);}}
>
  <Trash2 className="ml-2 cursor-pointer " size={14} />
</button>
          </div>
         
        </div>

        {/* BODY EXPANDIDO */}
        <div
          className={`
            px-4 pb-4 text-sm text-gray-600 transition-all duration-300
            ${isOpen ? "block" : "hidden"}
          `}
        >
          <div className="border-t pt-3 space-y-2">

            <div className="flex justify-between">
              <span className="text-gray-500">Data</span>
              <span className="font-medium text-[#0F1720]">
                {new Date(item.scheduledAt).toLocaleDateString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Hora</span>
              <span className="font-medium text-[#0F1720]">
                {new Date(item.scheduledAt).toLocaleTimeString(
                  "pt-BR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>

            {/* STATUS VISUAL */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Status</span>
              <span className="px-2 py-1 rounded-full text-xs bg-[#E6F7EF] text-[#2BAE66] font-bold">
                Confirmado
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  })}
     </div>
      )}
    </>
  );
}