"use client"

import pilates from "../../../public/aulaemgrupo.png"
import alert from "../../../public/alert.png"
import gil from "../../../public/gil.jpeg"
import Image from "next/image"
import { useState, useEffect } from "react"
import { api } from "@/services/api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function MarcacaoPilatesLayout() {
  const router = useRouter()

  const [agendamentos, setAgendamentos] = useState<string[]>([])

  const horarios = ["17:00", "18:00", "19:00", "20:00"]

  function buildScheduledAt(day: string, time: string) {

    const today = new Date()

    const weekDays: Record<string, number> = {
      "Domingo": 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      "Sábado": 6
    }

    const targetDay = weekDays[day]
    const currentDay = today.getDay()

    let diff = targetDay - currentDay
    if (diff <= 0) diff += 7

    const date = new Date(today)
    date.setDate(today.getDate() + diff)

    const [hour, minute] = time.split(":")
    date.setHours(Number(hour), Number(minute), 0, 0)

    return date
  }

  async function carregarAgendamentos() {
    try {
      const resposta = await api.get("/appointments")
      const lista = resposta.data.data

      const horarios: string[] = lista.flatMap((item: any) =>
        item.user?.appointments
          ?.filter((agendamento: any) => agendamento.status !== "CANCELLED")
          .map((agendamento: any) => {
            const date = new Date(agendamento.scheduledAt)
            const data = date.toLocaleDateString("sv-SE")
            const hora = date.toTimeString().slice(0, 5)
            return `${data} ${hora}`
          }) || []
      ).filter(Boolean)

      setAgendamentos(horarios as any)

    } catch {
      toast.error("Erro ao carregar agendamentos/dataehora")
    }
  }

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  async function reservarVaga(day: string, time: string) {

    try {

      const scheduledAt = buildScheduledAt(day, time)

      await api.post("/appointments", {
        description: "Marcacao do servico Pilates",
        scheduledAt,
        serviceTypeID: "eab56c8b-7612-4cf1-b5cb-4d507d00617b",
        type: "PILATES",
        status: "CONFIRMED"
      })

      toast.success("Vaga reservada com sucesso")
     await carregarAgendamentos()

    } catch (error) {
      console.log(error)
      toast.error("Erro ao reservar vaga")
    }
  }

  return (
    <div className="flex flex-col bg-[#F7FBFA] mt-10 pb-20 w-full mx-auto px-2 ">

      <h3 className="flex justify-center mx-auto rounded-md p-1.5 mt-10 mb-5 bg-[#2BAE66] text-white text-xs gap-2">
        <Image src={pilates} alt="aula_em_grupo" width={15} height={14} className="w-4 h-4" />
        Aulas em Grupo
      </h3>

      <h1 className="flex justify-center mb-5 text-2xl text-black font-bold">
        Turmas de Pilates
      </h1>

      <span className="flex w-full max-w-xl text-center items-center justify-center text-[#6B7280] mx-auto">
        As aulas são realizadas em grupo com horários fixos semanais.
      </span>

      <section className="flex w-full justify-center mt-10 bg-[#E6F7EF] p-2 max-w-3xl mx-auto rounded-md mb-10">
        <p className="flex gap-2 items-center text-xs text-black font-bold">
          <Image src={alert} alt="alerta_img" className="w-5 h-5 items-center" />
          Máximo de 4 alunos por turma. Duração: 50 minutos.
        </p>
      </section>

      {/* FOTO DRA MANTIDA */}
      <section className="flex w-full justify-center mt-10">
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 max-w-3xl w-full flex flex-col md:flex-row items-center md:items-start gap-6">

          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Image
              src={gil}
              alt="Dra. Gilmara Farias"
              width={90}
              height={90}
              className="rounded-full object-cover w-24 h-24 shadow-md hover:scale-110 transition"
            />
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-xl font-bold text-[#0F1720]">
              Dra. Gilmara Farias
            </h1>

            <p className="text-gray-600 text-sm">
              Fisioterapeuta — Clínica Olhar de Fisio
            </p>
          </div>

        </div>
      </section>

      <p className="flex justify-center items-center font-bold text-gray-500 mt-10 outline-1 rounded-md p-1.5 shadow bg-white mx-auto animate-bounce transition-shadow duration-700">
        Marcação da semana
      </p>

      <section className="w-full max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TERÇA */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 flex flex-col gap-4">

          <h2 className="text-lg font-bold">📅 Terça-feira</h2>

          <div className="flex flex-col gap-3">

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>17:00</span>
              <button onClick={() => reservarVaga("Terça-feira", "17:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>18:00</span>
              <button onClick={() => reservarVaga("Terça-feira", "18:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>19:00</span>
              <button onClick={() => reservarVaga("Terça-feira", "19:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>20:00</span>
              <button onClick={() => reservarVaga("Terça-feira", "20:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

          </div>
        </div>

        {/* SEXTA */}
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 flex flex-col gap-4">

          <h2 className="text-lg font-bold">📅 Sexta-feira</h2>

          <div className="flex flex-col gap-3">

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>17:00</span>
              <button onClick={() => reservarVaga("Sexta-feira", "17:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>18:00</span>
              <button onClick={() => reservarVaga("Sexta-feira", "18:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>19:00</span>
              <button onClick={() => reservarVaga("Sexta-feira", "19:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

            <div className="bg-[#F7FBFA] border rounded-lg p-3 flex justify-between items-center">
              <span>20:00</span>
              <button onClick={() => reservarVaga("Sexta-feira", "20:00")}
                className="bg-[#2BAE66] text-white text-xs px-2 py-1 rounded-md cursor-pointer">
                Reservar
              </button>
            </div>

          </div>
        </div>

      </section>

    </div>
  )
}