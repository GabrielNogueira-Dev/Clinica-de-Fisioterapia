"use client"
import logo from "../../public/Background.png"
import Image from "next/image"

import { useState } from "react"


export default function Header(){
    const [activeinicio,setActiveinicio] = useState("inicio")
    const [activeareadopaciente,setActiveareadopaciente] = useState("areadopaciente")
    const [activeagendamento,setActiveagendamento] = useState("agendamento")

    return(
        <header className="h-[70] w-full bg-[#F7FBFA] border-b-2 border-[#E5E5E5] flex items-center justify-center">
            <nav className="flex flex-row items-center justify-center between ">
             <Image className="mr-2" src={logo} alt="foto" width={25} height={25} />  <h1 className=" font-bold text-[#0F1720]">Olhar</h1><span className=" font-bold text-[#0F1720]">de</span><h1 className="font-bold text-[#0F1720]">Fisio</h1>
        <a href="#inicio" 
             onClick={()=> setActiveinicio("inicio")}
             className={`font-semibold cursor-pointer transition-colors ${
            activeinicio === "inicio" ? "text-[#2BAE66]" : "text-[#0F1720]"
          } between ml-10 `}
          >
             Inicio
          </a> 
            </nav>

          <a href="#Area-do-paciente"
               onClick= {()=> setActiveareadopaciente("areadopaciente")}
               className={`font-semibold cursor-pointer transition-colors ${
                activeareadopaciente === "areadopaciente" ? "text-[#2BAE66]" : "text-[#0F1720]"
               } evenly between ml-10 `}>
             Área do paciente</a>

               <a href="#Area-do-paciente"
               onClick= {()=> setActiveagendamento("agendamento")}
               className={`font-semibold cursor-pointer transition-colors ${
                activeagendamento === "agendamento" ? "text-[#2BAE66]" : "text-[#0F1720]"
               } evenly between ml-10 `}>
             Agendar Consulta</a>

        </header>
    )
}