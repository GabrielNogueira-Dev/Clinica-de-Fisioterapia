"use client";

import Image from "next/image";
import logo from "../../../public/Background.png";
import { logout } from "@/services/auth";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminSidebar() {
  const pathname = usePathname();

  function linkClass(path: string) {
    return `font-semibold p-2 rounded-md transition ${
      pathname === path
        ? "bg-[#E6F7EF] text-[#0F1720]"
        : "text-[#6B7280] hover:bg-gray-100"
    }`;
  }

  return (
    <aside className="p-6 w-64 bg-white text-[#6B7280] flex flex-col border-r border-[#d9daddd9]">

      {/* LOGO */}
    <Link href="/">
      <div  className="flex flex-row gap-1 mb-7 items-center">
        <Image src={logo} alt="logo" width={24} height={24} />
        <h1 className="font-bold italic font-serif tracking-wide text-[#0F1720]">
          Olhar <span>de Fisio</span>
        </h1>
      </div>
    </Link>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
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

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
      >
        Sair
      </button>
    </aside>
  );
}