"use client"
import Image from 'next/image'
import verificado from '../../../public/verificado.png'
import pilates from '../../../public/pilates.png'
import pilatesexercicioo from '../../../public/pilatesexercicio.jpg'
import seta from '../../../public/seta.png'
import { api } from '@/services/api'
import { useState } from 'react'



export default function PilatesEspecialidade(){

const [mensagem,setMensagem] = useState("")

const handleClick = async () => {
  try{
    await api.post("/appointments", {
    description: "Marcacao servico disponivel",
      scheduledAt: new Date().toISOString(),
      serviceTypeID: "ea8e1243-4bc5-4d3a-9db1-aeddcccdc2c2",
      type: "PILATES",
      status: "Confirmed"  
    });
    setMensagem("Especialidade marcada com sucesso!")
    console.log("msg pilates sucesso")
  return  {success:true, error:"Especialidade marcada com sucesso!"}
  }catch(err){
    setMensagem("Error ao salvar especialidade")
      console.log("msg pilates erorr" + err)
return {success:false, error:"Error ao salvar especialidade: "+ err}
  }
}

    return(
          <div className="flex flex-col bg-[#F7FBFA] w-full px-6 lg:px-20  gap-10 ">

      {/* TOPO  */}
      <section className="mt-10 flex flex-col justify-center items-center text-center gap-5 w-full">
        <h1 className="md:w-[60%] sm:w-full font-bold flex justify-center items-center md:text-3xl sm:text-2xl text-[#0F1720]">
          Nossas Especialidades
        </h1>

        <span className="md:w-[50%] sm:w-full flex justify-center items-center">
          Conheça a fundo os tratamentos oferecidos pela OlhardeFisio e descubra como podemos ajudar você a viver com mais saúde, equilíbrio e sem dores.
        </span>
      </section>

      {/* CONTEÚDO DUAS COLUNAS */}
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

          <button onClick={handleClick} 
           className="p-2 bg-[#2BAE66] text-white rounded-sm w-fit cursor-pointer">
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
   
   <section className="flex flex-col md:flex-row items-center justify-center w-full gap-5 mt-10 mb-10">

 <section className="flex flex-col md:flex-row items-stretch justify-center sm:items-center w-full gap-5 mt-10 mb-10">

  {/* CARD 1 */}
  <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col items-start gap-3">
    <div className="flex flex-row gap-2 items-center">
      <Image src={verificado} alt="img verificado" />
      <h2 className="font-bold text-[#0F1720] text-xl">Principais Benefícios</h2>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Melhora significativa da postura</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Fortalecimento do core e músculos</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Aumento da flexibilidade e mobilidade</p>
      </div>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col items-start gap-3">
    <div className="flex flex-row gap-2 items-center">
      <Image src={verificado} alt="img verificado" />
      <h2 className="font-bold text-[#0F1720] text-xl">Por que fazer?</h2>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Alívio de dores nas costas</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Melhora na coordenação motora</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Prevenção e tratamento de lesões</p>
      </div>
    </div>
  </div>

  {/* CARD 3 */}
  <div className="w-full sm:w-1/3 bg-white rounded-sm shadow-lg p-5 flex flex-col items-start gap-3">
    <div className="flex flex-row gap-2 items-center">
      <Image src={verificado} alt="img verificado" />
      <h2 className="font-bold text-[#0F1720] text-xl">O que proporciona?</h2>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Um corpo mais equilibrado e alinhado</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Maior consciência corporal no dia a dia</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Qualidade de vida e bem-estar duradouro</p>
      </div>
    </div>
  </div>

</section>

    </section>

  </div>

  )
}