"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 w-full border-t border-white/10 bg-[#0b0f19] text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">

        {/* LEFT */}
        <div className="max-w-md">
          <h2 className="text-[#2ec136] font-semibold tracking-widest uppercase text-sm">
            OlhardeFisio
          </h2>

          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Plataforma desenvolvida com acessibilidade, clareza e experiência para o utilizador.
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-sm sm:text-right">
          <p className="text-gray-300">
            Criado por{" "}
            <a
              href="https://www.linkedin.com/in/gabriel-nogueira-2944b5335/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-200 hover:text-cyan-400 transition-colors"
            >
              GabrielNogueira.Dev
            </a>
          </p>

          <p className="text-gray-500 mt-1">
            © {year} Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
