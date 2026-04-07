import pilates from "../../public/pilates.png"
import ventosaterapia from "../../public/ventosaterapia.png"
import acumpuntura from "../../public/acumpuntura.png"
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
    
    <section className="flex flex-row w-[50%] justify-center items-start gap-10">

  <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 w-48 min-h-[240px] shadow-lg shadow-black/10">
    <Image
      src={pilates}
      alt="pilates icon"
      className="bg-[#2BAE66] rounded-full w-16 h-16 p-3 mb-5"
      priority
    />
    <span className="font-bold text-[#0F1720]">Pilates</span>
    <p className="mt-1 text-[#6B7280] text-sm">
      Sessão focada em postura e flexibilidade do paciente.
    </p>
  </nav>

  <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 w-48 min-h-[240px] shadow-lg shadow-black/10">
    <Image
      src={ventosaterapia}
      alt="ventosaterapia icon"
      className="bg-[#2BAE66] rounded-full w-16 h-16 p-3 mb-5"
      priority
    />
    <span className="font-bold text-[#0F1720]">Ventosaterapia</span>
    <p className="mt-1 text-[#6B7280] text-sm">
      Alívio de dores musculares através de sucção terapêutica.
    </p>
  </nav>

  <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 w-48 min-h-[240px] shadow-lg shadow-black/10">
    <Image
      src={acumpuntura}
      alt="acupuntura icon"
      className="bg-[#2BAE66] rounded-full w-16 h-16 p-3 mb-5"
      priority
    />
    <span className="font-bold text-[#0F1720]">Acupuntura</span>
    <p className="mt-1 text-[#6B7280] text-sm">
      Equilíbrio energético e tratamento de diversas patologias.
    </p>
  </nav>

    </section>





        </section>

</div>
           
    )
}