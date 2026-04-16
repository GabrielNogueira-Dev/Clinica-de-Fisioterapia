import Image from 'next/image'
import verificado from '../../../public/verificado.png'
import ventosaterapia from '../../../public/ventosaterapia.jpg'
import ventosa from '../../../public/ventosa.png'
import seta from '../../../public/seta.png'

export default function VentosaEspecialidade(){

    return(
          <div className="flex flex-col bg-[#E6F7EF] w-full px-6 lg:px-20  gap-10 ">

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
 <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={ventosaterapia}
            alt="foto pilates"
            className="rounded-md w-3/5 h-3/5 bg-amber-700 shadow-lg transition-transform hover:rotate-6 duration-300"
            priority
          />
        </div>
      

        {/* LADO DIREITO C IMAGEM */}
       
        <div className="flex flex-col justify-center gap-5 w-full lg:w-1/2">

          <div className="flex flex-row items-center gap-2">
            <Image
              src={ventosa}
              alt="foto"
              className="rounded-sm bg-[#2BAE66] p-1.5 "
               width={40}
               height={40}
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
        <p className="text-[14px] ">Relaxamento muscular profundo</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Eliminação de toxinas do sangue</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Melhora expressiva na circulação sanguinea</p>
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
        <p className="text-[14px] ">Dores articulares e rigidez</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Tensão muscular causada por estresse</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Tratamento de nós de tensão e contraturas</p>
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
        <p className="text-[14px] ">Melhora na oxigenação dos tecidos</p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Qualidade de vida e bem-estar duradouro </p>
      </div>

      <div className="flex flex-row gap-2 items-start">
        <Image src={seta} alt="seta img" />
        <p className="text-[14px] ">Leveza e aceleração na recuperação de fadiga</p>
      </div>
    </div>
  </div>

</section>

    </section>

  </div>

  )
}