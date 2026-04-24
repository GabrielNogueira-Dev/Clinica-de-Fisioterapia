"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Clock2Icon } from "lucide-react"
import { api } from "@/services/api"
import { useAuth } from "@/services/auth"
import { toast } from "react-toastify"

interface DataHoraProps {
  setDataSelecionada: (valor: string) => void
  setHorarioSelecionado: (valor: string) => void
}

export default function DataHora({ setDataSelecionada, setHorarioSelecionado }: DataHoraProps) {
  const { isAuthenticated } = useAuth()

  const [dataSelecionadaCalendario, setDataSelecionadaCalendario] = useState<Date>()
  const [horaSelecionada, setHoraSelecionada] = useState("")
  const [agendamentosOcupados, setAgendamentosOcupados] = useState<string[]>([])
  const [horariosLivres, setHorariosLivres] = useState<string[]>([])

  const horariosPossiveis = [
    "08:00","09:00","10:00","11:00",
    "13:00","14:00","15:00","16:00","17:00","18:00"
  ]

  // Corrigir data para envio
  function gerarDataISOcorrigida(data: Date) {
    const dataCorrigida = new Date(data)
    dataCorrigida.setDate(dataCorrigida.getDate() + 1)
    return dataCorrigida.toISOString().split("T")[0]
  }

  // Buscar agendamentos
  async function carregarAgendamentos() {
    try {
      const resposta = await api.get("/appointments")
      const lista = resposta.data.data

      const horarios: string[] = lista.flatMap((item: any) =>
        item.user?.appointments?.map((agendamento: any) =>
          agendamento.scheduledAt.slice(11, 16) // pega HH:mm direto
        ) || []
      )

      setAgendamentosOcupados(horarios)
    } catch {
      toast.error("Erro ao carregar agendamentos")
    }
  }

  useEffect(() => {
    if (isAuthenticated) carregarAgendamentos()
  }, [isAuthenticated])

  // Quando seleciona dia
  function aoSelecionarDia(data: Date | undefined) {
    if (!data) return

    setDataSelecionadaCalendario(data)

    const livres = horariosPossiveis.filter(
      (horario) => !agendamentosOcupados.includes(horario)
    )

    setHorariosLivres(livres)
    setDataSelecionada(gerarDataISOcorrigida(data))
  }

  // Quando seleciona horário
  useEffect(() => {
    if (horaSelecionada) {
      setHorarioSelecionado(horaSelecionada)
    }
  }, [horaSelecionada])

  return (
    <>
      <Card size="sm" className="mx-auto w-fit border border-[#e9eaec]">
        <CardContent>
          <Calendar
            mode="single"
            selected={dataSelecionadaCalendario}
            onSelect={aoSelecionarDia}
            className="p-0 cursor-pointer"
          />
        </CardContent>

        <CardFooter className="border-t bg-card">
          <FieldGroup>
            <Field>
              <FieldLabel>Horário</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="time"
                  value={horaSelecionada}
                  onChange={(e) => setHoraSelecionada(e.target.value)}
                  step="60"
                />
                <InputGroupAddon>
                  <Clock2Icon className="text-black" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>

      {dataSelecionadaCalendario && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-center font-bold text-md text-black">
            Horários disponíveis em{" "}
            {dataSelecionadaCalendario.toLocaleDateString("pt-PT")}
          </h2>

          {horariosLivres.length === 0 ? (
            <p className="text-red-600 mt-2 text-center">
              Nenhum horário disponível.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {horariosLivres.map((horario) => (
                <button
                  key={horario}
                  onClick={() => setHoraSelecionada(horario)}
                  className="px-2 py-1 text-xs bg-[#2BAE66] text-white rounded-md hover:bg-[#239a58]"
                >
                  {horario}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}