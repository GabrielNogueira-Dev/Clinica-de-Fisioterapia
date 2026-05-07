"use client";

import Image from "next/image";
import logo from "../../../public/Background.png";
import { logout } from "@/services/auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile começa fechado

  function linkClass(path: string) {
    return `font-semibold p-2 rounded-md transition ${
      pathname === path
        ? "bg-[#E6F7EF] text-[#0F1720]"
        : "text-[#6B7280] hover:bg-gray-100"
    }`;
  }

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
      >
        <Menu size={20} />
      </button>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

     <aside
  className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-white text-[#6B7280] flex flex-col border-r 
 border-[#d9daddd9] transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
>
        {/* LOGO */}
        <Link href="/" className="flex gap-2 items-center mb-7 p-6">
          <Image src={logo} alt="logo" width={24} height={24} />
          <h1 className="font-bold italic font-serif text-[#0F1720]">
            Olhar <span>de Fisio</span>
          </h1>
        </Link>

       {/* MENU */}
    <nav className="flex flex-col gap-2 px-6">
      <Link href="/admin" className={linkClass("/admin")}>
        Dashboard
      </Link>

      <Link href="/admin/users" className={linkClass("/admin/users")}>
        Usuários
      </Link>

      <Link href="/admin/appointments" className={linkClass("/admin/appointments")}>
        Agendamentos
      </Link>
    </nav>

    {/* ESPAÇADOR + LOGOUT */}
    <div className="mt-auto p-6">
      <button
        onClick={logout}
        className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
      >
        Sair
      </button>
    </div>
      </aside>
    </>
  );
}