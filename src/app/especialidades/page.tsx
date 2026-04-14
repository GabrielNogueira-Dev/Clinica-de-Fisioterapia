import Image from 'next/image'
import pilates from '../../../public/pilates.png'
import pilatesexercicioo from '../../../public/pilatesexercicio.jpg'

export default function Especialidades() {
  return (
    <div className="flex flex-col w-full px-6 lg:px-20 mt-10 lg:mt-20 gap-10">

      {/* TOPO  */}
      <section className="flex flex-col justify-center items-center text-center gap-5 w-full">
        <h1 className="md:w-[60%] sm:w-full font-bold flex justify-center items-center md:text-3xl sm:text-2xl text-[#0F1720]">
          Nossas Especialidades
        </h1>

        <span className="md:w-[50%] sm:w-full flex justify-center items-center">
          Conheça a fundo os tratamentos oferecidos pela OlhardeFisio e descubra como podemos ajudar você a viver com mais saúde, equilíbrio e sem dores.
        </span>
      </section>

      {/* CONTEÚDO ESQ COLUNA */}
      <section className="flex flex-col lg:flex-row items-center justify-between w-full gap-10">

        {/* LADO ESQUERDO */}
        <div className="flex flex-col justify-center gap-5 w-full lg:w-1/2">

          <div className="flex flex-row items-center gap-2">
            <Image
              src={pilates}
              alt="foto"
              className="rounded-sm bg-[#2BAE66] p-1.5 "
              priority
            />

            <h1 className="font-bold text-[#0F1720] text-2xl">
              Pilates Clínico
            </h1>
          </div>

          <span>
            O Pilates Clínico é um método terapêutico focado no controle muscular, correção postural e respiração. É ideal tanto para a reabilitação de lesões quanto para a melhora do condicionamento físico, força e flexibilidade do corpo.
          </span>

          <button className="p-2 bg-[#2BAE66] text-white rounded-sm w-fit cursor-pointer">
            Agendar Sessão de Pilates
          </button>
        </div>

        {/* LADO DIREITO C IMAGEM */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={pilatesexercicioo}
            alt="foto pilates"
            className="rounded-md w-2/5 h-2/5 bg-amber-700 shadow-lg transition-transform hover:rotate-6 duration-300"
            priority
          />
        </div>

      </section>

{/* DIVISAO de GRADES*/}
      

    </div>
  )
}
