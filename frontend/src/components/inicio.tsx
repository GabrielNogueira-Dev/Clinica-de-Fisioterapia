import clinica from '../../public/Fisioterapia.png';
import Image from 'next/image';

export default function Inicio() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full px-6 lg:px-20 mt-10 lg:mt-20 gap-10">

      {/* Texto */}
      <nav className="flex flex-col max-w-xl">
        <span className="font-medium text-[10px] bg-[#E6F7EF] w-fit px-3 py-1 rounded-sm">
          Clínica Especializada
        </span>

        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-3">
          Sua saúde e bem estar em primeiro lugar.
        </h1>

        <span className="text-base sm:text-lg lg:text-xl text-[#6B7280] mt-3">
          Agende suas sessões de Pilates, Ventosaterapia e Acupuntura de forma rápida, simples e segura no portal OlhardeFisio.
        </span>

        <section className="flex flex-col sm:flex-row items-center gap-3 mt-5">
          <span className="text-[16px] bg-[#2BAE66] font-semibold text-white rounded-md px-4 py-2 cursor-pointer">
            Ver Especialidades
          </span>

          <span className="text-[16px] font-semibold text-black cursor-pointer">
            Acessar minha conta
          </span>
        </section>
      </nav>

      {/* Imagem */}
      <nav className="w-full flex justify-center">
        <Image
          src={clinica}
          alt="foto"
          className="rounded-sm w-full max-w-md lg:max-w-lg h-auto"
          priority
        />
      </nav>

    </div>
  );
}
