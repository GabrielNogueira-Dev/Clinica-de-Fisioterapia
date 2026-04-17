
import pilates from "../../../public/pilates.png";
import ventosa from "../../../public/ventosa.png";
import acupuntura from "../../../public/acupuntura.png";
import Image from "next/image";

export default function Especialidade(){

    return(
         <>
                    <nav className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2BAE66] text-white text-sm font-semibold">
                        1
                      </span>
        
                      <h3 className="font-medium text-[#0F1720]">
                        Selecione a Especialidade
                      </h3>
                    </nav>
        
                    <section className="flex flex-col md:flex-row w-[70%] justify-center items-start gap-10 mt-2">
                      <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 md:w-48 min-h-60 shadow-lg shadow-black/10 cursor-pointer">
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
        
                      <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 md:w-48 min-h-60 shadow-lg shadow-black/10 cursor-pointer">
                        <Image
                          src={ventosa}
                          alt="ventosaterapia icon"
                          className="bg-[#2BAE66] rounded-full w-16 h-16 p-3 mb-5"
                          priority
                        />
                        <span className="font-bold text-[#0F1720]">Ventosaterapia</span>
                        <p className="mt-1 text-[#6B7280] text-sm">
                          Alívio de dores musculares através de sucção terapêutica.
                        </p>
                      </nav>
        
                      <nav className="flex flex-col items-center text-center border border-[#6B7280]/20 rounded-xl p-5 md:w-48 min-h-60 shadow-lg shadow-black/10 cursor-pointer">
                        <Image
                          src={acupuntura}
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
                  </>
    )
}