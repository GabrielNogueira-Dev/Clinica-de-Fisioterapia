"use client"

import pilates from "../../../public/aulaemgrupo.png"
import alert from "../../../public/alert.png"
import gil from "../../../public/gil.jpeg"
import Image from "next/image"
import { useState,useEffect } from "react"
import { api } from "@/services/api"

interface Appointment {
  id: string
  dia: string
  horario: string
  vaga: string
}

export default function MarcacaoPilatesLayout() {
 
const [agendamentos,setAgendamentos] = useState<Appointment[]>([])

  const horarios = ["17:00", "18:00", "19:00", "20:00"]
  const vagas = ["1", "2", "3", "4"]
  
 async function carregarAgendamentos(){

  try{

    const response = await api.get("/appointments")

setAgendamentos(response.data.data)
console.log("aqui " + response.data.data)
  }catch(err){
    console.log(err)
  }

 }

 useEffect(() => {
carregarAgendamentos()
 },[])

 function vagaOcupada(dia:string, horario:string, vaga: string){
  return agendamentos.some((item)=> item.dia === dia && item.horario === horario && item.vaga === vaga )
 }

  return (
    <div className="flex flex-col  bg-[#F7FBFA] mt-10 pb-20 w-full mx-auto px-2 ">
      <h3 className="flex justify-center mx-auto rounded-md p-1.5 mt-10 mb-5 bg-[#2BAE66] text-white text-xs gap-2"> <Image src={pilates} alt="aula_em_grupo" width={15} height={14} /> Aulas em Grupo</h3>
      <h1 className="flex justify-center mb-5 text-2xl text-black font-bold">Turmas de Pilates</h1>
      <span className="flex w-full max-w-xl text-center items-center justify-center text-[#6B7280]  mx-auto">As aulas são realizadas em grupo com horários fixos semanas. Cada turma tem vagas limitadas com número minimo de alunos - selecione e escolha sua vaga.</span>
   
    <section className="flex w-full justify-center mt-10 bg-[#E6F7EF] p-2 max-w-3xl mx-auto rounded-md mb-10">
      <p className="flex gap-2 items-center text-xs text-black font-bold"> <Image src={alert} alt="alerta_img" className="w-5 h-5 items-center" /> Máximo de 4 alunos por turma. Duração: 50 minutos. Cancelamentos devem ser feitos com no mínimo 24hrs de antecedência.</p>
    </section>

    <section className="flex w-full justify-center mt-10">
  <div className="
    bg-white shadow-lg border border-gray-200 rounded-xl p-6 max-w-3xl w-full 
    flex flex-col md:flex-row items-center md:items-start gap-6
  ">

    {/* FOTO */}
    <div className="flex justify-center md:justify-start w-full md:w-auto">
      <Image
        src={gil}
        alt="Dra. Gilmara Farias"
        width={90}
        height={90}
        className="rounded-full object-cover w-24 h-24 shadow-md 
                   hover:scale-110 transition"
      />
    </div>

    {/* INFORMAÇÕES */}
    <div className="flex flex-col gap-2 text-center md:text-left">

      <h1 className="text-xl font-bold text-[#0F1720]">
        Dra. Gilmara Farias
      </h1>

      <p className="text-gray-600 text-sm">
        Fisioterapeuta — Clínica Olhar de Fisio
      </p>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
        <span className="bg-[#E6F7EF] text-[#2BAE66] text-xs font-medium px-2 py-1 rounded-md">
          <span className="font-bold">CREFITO</span> Ativo
        </span>
        <span className="bg-[#E6F7EF] text-[#2BAE66] text-xs font-medium px-2 py-1 rounded-md">
          +5 anos de experiência
        </span>
        <span className="bg-[#E6F7EF] text-[#2BAE66] text-xs font-medium px-2 py-1 rounded-md">
          Fisioterapeuta e Pilates Clínico
        </span>
      </div>

    </div>
  </div>
</section>


{/* CARDS */}

    {/* SELEÇÃO DE TURMAS */}
<section className="w-full max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* TERÇA-FEIRA */}
  <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 flex flex-col gap-4">
    <h2 className="text-lg font-bold text-[#0F1720] flex items-center gap-2">
      📅 Terça-feira
    </h2>

    <p className="text-sm text-gray-600">
      Escolha o horário e selecione sua vaga disponível.
    </p>

    {/* HORÁRIOS */}
    <div className="flex flex-col gap-3">

      {/* CARD DE HORÁRIO */}
      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">18:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
           {vagas.filter((vaga) => !vagaOcupada("Terça-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>

        {/* VAGAS */}

      </div>

      {/* OUTRO HORÁRIO */}
      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">19:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
             {vagas.filter((vaga) => !vagaOcupada("Terça-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>


      </div>

       {/* OUTRO HORÁRIO */}
      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">20:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
             {vagas.filter((vaga) => !vagaOcupada("Terça-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex ">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>


      </div>

    </div>
  </div>
  

  {/* SEXTA-FEIRA */}
  <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 flex flex-col gap-4">
    <h2 className="text-lg font-bold text-[#0F1720] flex items-center gap-2">
      📅 Sexta-feira
    </h2>

    <p className="text-sm text-gray-600">
      Escolha o horário e selecione sua vaga disponível.
    </p>

    {/* HORÁRIOS */}
    <div className="flex flex-col gap-3">

      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">18:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
             {vagas.filter((vaga) => !vagaOcupada("Sexta-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>

      </div>

      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">19:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
             {vagas.filter((vaga) => !vagaOcupada("Sexta-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>

      </div>

       {/* OUTRO HORÁRIO */}
      <div className="bg-[#F7FBFA] border rounded-lg p-3 flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">20:00</span>
          <span className="text-xs bg-[#E6F7EF] text-[#2BAE66] px-2 py-1 rounded-md">
             {vagas.filter((vaga) => !vagaOcupada("Sexta-feira", "18:00",vaga)).length}
           {""} Vagas disponíveis
          </span>
        <div className="flex gap-2">

          <button className="cursor-pointer bg-[#2BAE66] rounded-md mx-auto text-white p-1.5 text-xs "> Reservar vaga</button>
         
        </div>
        </div>


      </div>

    </div>
  </div>

</section>



    </div>

   

)}