import pilates from "../../public/pilates.png"
import Image from "next/image"

export default function Agendamento(){

    return(
    <div className="flex flex-col w-full">
        {/* Texto explicativo */}
       <section className="flex flex-col w-full ">

         <nav id="Agendamento" className="flex flex-col w-full justify-center items-center mt-15">
            <h1 className="text-[#0F1720] font-bold md:text-2xl">Agendar Consulta</h1>
            <span className=" mt-5 text-[#6B7280] font-medium">Siga os passos abaixo para selecionar o serviço desejado e o melhor horário para você.</span>
        </nav>

       </section>

        {/*Formulário do agendamento */}

        <section className="flex flex-col w-full  justify-center items-center mt-10 gap-5 ">
<nav className="flex items-center gap-3">
  <span
    className=" flex items-center justify-center w-8 h-8 rounded-full bg-[#2BAE66] text-white text-sm font-semibold " > 1 </span>

  <h3 className="font-medium text-[#0F1720]">
    Selecione a Especialidade
  </h3>

</nav>
        <section className="flex flex-col     ">
            
            <nav className="flex flex-col  w-full">
                <Image
                src={pilates}
                alt="pilates icon"
                className=" bg-[#2BAE66] rounded-full max-w-md lg:max-w-lg h-auto"
                priority
                />
            </nav>

        </section>



        </section>

</div>
           
    )
}