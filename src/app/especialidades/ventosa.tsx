"use client"
import Image from 'next/image'
import verificado from '../../../public/verificado.png'
import ventosaterapia from '../../../public/ventosaterapia.jpg'
import ventosa from '../../../public/ventosa.png'
import seta from '../../../public/seta.png'

import { useRouter } from 'next/navigation'

export default function VentosaEspecialidade(){

  const router = useRouter()

  function handleClick(){
    router.push("/?scrollTo=Agendamento")
  }

  return(
    <div className="flex flex-col bg-[#E6F7EF] w-full px-6 lg:px-20 gap-10">

      {/* CONTEÚDO DUAS COLUNAS */}
      <section className="mt-15 flex flex-col lg:flex-row items-center justify-between w-full gap-10">

        {/* LADO ESQUERDO */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={ventosaterapia}
            alt="foto ventosaterapia"
            className="rounded-md w-3/5 h-3/5 shadow-lg transition-transform hover:rotate-6 duration-300"
            priority
          />
        </div>

        {/* LADO DIREITO */}
        <div className="flex flex-col justify-center gap-5 w-full lg:w-1/2">

          <div className="flex flex-row items-center gap-2">
            <Image
              src={ventosa}
              alt="foto"
              className="rounded-sm bg-[#2BAE66] p-1.5"
              width={40}
              height={40}
              priority
            />

            <h1 className="font-bold text-[#0F1720] text-2xl">
              Ventosaterapia
            </h1>
          </div>

          <span>
            Uma técnica milenar que utiliza a sucção para promover o aumento do fluxo sanguíneo em áreas específicas do corpo.
          </span>

          <button
            onClick={handleClick}
            className="p-2 bg-[#2BAE66] text-white rounded-sm w-fit cursor-pointer"
          >
            Agendar Sessão de Ventosaterapia
          </button>
        </div>

      </section>

      {/* CARDS */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full gap-5 mt-10 mb-10">

        <section className="flex flex-col md:flex-row items-stretch justify-center w-full gap-5 mt-10 mb-10">

          {/* CARD 1 */}
          <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src={verificado} alt="img verificado" />
              <h2 className="font-bold text-[#0F1720] text-xl">Principais Benefícios</h2>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Relaxamento muscular profundo</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Eliminação de toxinas</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Melhora da circulação sanguínea</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src={verificado} alt="img verificado" />
              <h2 className="font-bold text-[#0F1720] text-xl">Por que fazer?</h2>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Dores articulares e rigidez</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Tensão muscular por estresse</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Tratamento de contraturas</p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src={verificado} alt="img verificado" />
              <h2 className="font-bold text-[#0F1720] text-xl">O que proporciona?</h2>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Melhor oxigenação dos tecidos</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Bem-estar duradouro</p>
              <p className="text-[14px] flex gap-2"><Image src={seta} alt="seta" /> Recuperação mais rápida</p>
            </div>
          </div>

        </section>

      </section>

    </div>
  )
}
