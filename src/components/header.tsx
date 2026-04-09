"use client";
import logo from "../../public/Background.png";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  return (
    <header className="w-full bg-[#F7FBFA] border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-1">
          <Image src={logo} alt="logo" width={28} height={28} />
          <h1 className="font-bold text-[#0F1720]">Olhar</h1>
          <span className="font-bold text-[#0F1720]">de</span>
          <h1 className="font-bold text-[#0F1720]">Fisio</h1>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#inicio"
            onClick={() => setActive("inicio")}
            className={`font-semibold transition-colors ${
              active === "inicio" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Início
          </a>

          <a
            href="#Area-do-paciente"
            onClick={() => setActive("areadopaciente")}
            className={`font-semibold transition-colors ${
              active === "areadopaciente" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Área do Paciente
          </a>

          <a
            href="#Agendamento"
            onClick={() => setActive("agendamento")}
            className={`font-semibold transition-colors ${
              active === "agendamento" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Agendar Consulta
          </a>
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-[#0F1720]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <a
            href="#inicio"
            onClick={() => {
              setActive("inicio");
              setOpen(false);
            }}
            className={`font-semibold ${
              active === "inicio" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Início
          </a>

          <a
            href="#Area-do-paciente"
            onClick={() => {
              setActive("areadopaciente");
              setOpen(false);
            }}
            className={`font-semibold ${
              active === "areadopaciente" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Área do Paciente
          </a>

          <a
            href="#Agendamento"
            onClick={() => {
              setActive("agendamento");
              setOpen(false);
            }}
            className={`font-semibold ${
              active === "agendamento" ? "text-[#2BAE66]" : "text-[#0F1720]"
            }`}
          >
            Agendar Consulta
          </a>
        </nav>
      )}
    </header>
  );
}
