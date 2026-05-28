"use client";

import logo from "../../public/favicon.ico";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth, logout } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { api } from "../services/api";
import { ScrollText } from "lucide-react";

interface AdminHeaderProps {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function Header() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AdminHeaderProps | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("areadopaciente");

 //busca os detalhes do admin logado
  async function detalheAdmin() {
    try {
      const response = await api.get("/me");
      setUser(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setUser(null);
        logout();
        router.replace("/login");
      }
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null);
      return;
    }

    detalheAdmin();
  }, [isAuthenticated]);

  if (pathname.startsWith("/admin")) return null;

  const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <header className="w-full bg-[#F7FBFA] border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-1">
          <a href="/" className="flex items-center gap-1">
            <Image src={logo} alt="logo" width={28} height={28} className="rounded-full object-cover"/>

            <h1 className="font-bold text-[#0F1720] italic font-serif tracking-wide">
              Olhar <span className="text-[#141b24]">de Fisio</span>
            </h1>
          </a>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-10">

          {/* ADMIN */}
          {isAdmin && (
             <a
          href="/admin"
          className="flex items-center gap-2 text-[#0F1720] font-bold hover:text-red-600 transition-colors"
          onClick={() => setOpen(false)}
        >
          <ScrollText size={18} className="text-black hover:text-red-600 transition-all duration-300 hover:scale-125" />
        </a>
          )}

          <a
            href="#Area-do-paciente"
            onClick={() => setActive("areadopaciente")}
            className={`font-semibold transition-colors ${
              active === "areadopaciente"
                ? "text-[#2BAE66]"
                : "text-[#0F1720]"
            }`}
          >
            Área do Paciente
          </a>

          <a
            href="#Agendamento"
            onClick={() => setActive("agendamento")}
            className={`font-semibold transition-colors ${
              active === "agendamento"
                ? "text-[#2BAE66]"
                : "text-[#0F1720]"
            }`}
          >
            Agendar Consulta
          </a>

          {!loading && isAuthenticated && (
            <button
              onClick={() => {
                logout();
                setUser(null);
              }}
              className="cursor-pointer font-semibold text-[#0F1720] hover:text-[#2BAE66]"
            >
              Sair
            </button>
          )}
        </nav>

        {/* MOBILE BUTTON */}
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

          {/* ADMIN MOBILE */}
          {isAdmin && (
            <a
          href="/admin"
          className="flex items-center gap-2 text-[#0F1720] font-bold hover:text-red-600 transition-colors"
          onClick={() => setOpen(false)}
        >
          <ScrollText size={18} className="text-black hover:text-red-600 transition-all duration-300 hover:scale-125" />
        </a>
          )}

          <a
            href="/inicio"
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
              active === "areadopaciente"
                ? "text-[#2BAE66]"
                : "text-[#0F1720]"
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
              active === "agendamento"
                ? "text-[#2BAE66]"
                : "text-[#0F1720]"
            }`}
          >
            Agendar Consulta
          </a>

          {!loading && isAuthenticated && (
            <button
              onClick={() => {
                logout();
                setUser(null);
                setOpen(false);
              }}
              className="font-semibold text-[#0F1720] hover:text-[#2BAE66]"
            >
              Sair
            </button>
          )}
        </nav>
      )}
    </header>
  );
}