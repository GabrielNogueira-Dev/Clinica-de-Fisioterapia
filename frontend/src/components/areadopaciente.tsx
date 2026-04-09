"use client"

export default function AreaDoPaciente() {
  return (
    <div id="Area-do-paciente" className="bg-[#E6F7EF] mt-10 pb-20 w-full mx-auto px-2">
      
      <nav className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold text-center py-10 break-words">Área do Paciente</h1>
        <span className="flex w-full max-w-xl text-center items-center justify-center text-[#6B7280] break-words">
          Acesse sua conta para gerenciar suas consultas ou cadastre-se para realizar seu primeiro agendamento.
        </span>
      </nav>

      <nav className="flex flex-col md:flex-row md:w-[70%] sm:w-[80%] p-8 bg-white rounded-md shadow-md mx-auto md:items-start sm:items-center sm:justify-center">
        
        {/* Esquerda */}
        <section className="flex flex-col w-full md:w-1/2 md:items-start ">
          <h2 className="font-bold text-xl mb-5 break-words">Já sou paciente</h2>

          <label htmlFor="email" className="font-medium">E-mail</label>
          <input
            id="email"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] 
                       border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="seu@email.com"
            type="email"
          />

          <label htmlFor="senha" className="font-medium mt-5">Senha</label>
          <input
            id="senha"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] 
                       border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="*******"
            type="password"
          />

                { /* Lembrar-me e Esqueci minha senha lado a lado */}

        <section className="flex flex-row w-full justify-between items-center  mt-3">

         <div className="flex flex-row w-full justify-between items-center">

         <nav >
             <input type="checkbox" id="lembrar" className="mr-2"/>
             <label htmlFor="lembrar" className="text-sm text-[#6B8280]">Lembrar-me</label>
         </nav>
             <nav>
              <a href="#" className="text-sm text-[#2BAE66] ml-auto">Esqueci minha senha</a>
            </nav>
        
         </div>
        </section>

      <div className="flex text-center items-center justify-center w-full">
          <button className="w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#2BAE66] text-white">Entrar na conta  </button>
      </div>

        </section>

                {/* Linha de separação vertical */}
        
        <div className="hidden md:block w-px bg-gray-300 mx-8 self-stretch"></div>


        {/* Direita */}
        <section className="flex flex-col w-full md:w-1/2 justify-center md:items-start ">
          <h2 className="font-bold text-xl mb-5 mt-10 md:mt-0 break-words">Novo por aqui?</h2>

           <label htmlFor="nome" className="font-medium">Nome Completo</label>
          <input
            id="nome"
            className="px-3 w-full py-2 mt-2 mb-2 font-semibold text-[14px] text-[#6B7280] 
                       border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="Ex: Maria Joaquina Silva"
            type="text"/>

             <label htmlFor="email" className="font-medium">E-mail</label>
          <input
            id="email"
            className="px-3 w-full py-2 mt-2 font-semibold text-[14px] text-[#6B7280] 
                       border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
            placeholder="Ex: maria@email.com"
            type="email"/>

                { /* Telefone e senha ao lado um do outro */}
{/* Telefone + Senha lado a lado */}
<section className="flex flex-col md:flex-row w-full gap-6 mt-5">

  {/* Coluna Telefone */}
  <div className="flex flex-col w-full md:w-1/2">
    <label htmlFor="telefone" className="font-medium">Telefone</label>
    <input
      id="telefone"
      className="mt-2 px-3 w-full max-w-xs py-2 font-semibold text-[14px] text-[#6B7280]
                 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
      type="text"
      placeholder="(00) 00000-0000"
    />
  </div>

  {/* Coluna Senha */}
  <div className="flex flex-col w-full md:w-1/2">
    <label htmlFor="senha" className="font-medium">Senha</label>
    <input
      id="senha"
      className="mt-2 px-3 w-full max-w-xs py-2 font-semibold text-[14px] text-[#6B7280]
                 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-[#2BAE66] focus:border-[#2BAE66]"
      type="password"
      placeholder="*******"
    />
  </div>


</section>

  <div className="flex text-center items-center justify-center w-full">
     <button className="w-full md:py-2 sm:py-1 mt-3 rounded-sm bg-[#b6b8ba] text-[#0F1720] cursor-pointer">Criar minha conta  </button>
  </div>

        </section>

      </nav>
    </div>
  );
}
