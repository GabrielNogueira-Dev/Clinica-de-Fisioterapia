"use client"

import * as React from "react"
import { Clock2Icon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Dispatch, SetStateAction } from "react";

interface DataHoraProps {
  setDataSelecionada: Dispatch<SetStateAction<string>>;
  setHorarioSelecionado: Dispatch<SetStateAction<string>>;
}

export default function DataHora({ setDataSelecionada, setHorarioSelecionado }: DataHoraProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [hora, setHora] = React.useState("");

// Formata a data corretamente (YYYY-MM-DD)
  function formatarDataLocal(date: Date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  // Atualiza o estado do componente pai ao selecionar a data
  React.useEffect(() => {
    if (date) {
      
      const dataFormatada = formatarDataLocal(date)
      setDataSelecionada(dataFormatada);
     
    }
  }, [date, setDataSelecionada]);

  // Atualiza o estado do componente pai ao selecionar o horário
  React.useEffect(() => {
    if (hora) {
      setHorarioSelecionado(hora);
    }
  }, [hora, setHorarioSelecionado]);

  return (
    <Card
      size="sm"
      className="mx-auto w-fit border border-[#e9eaec]"
      lang="pt-br"
    >
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="p-0 cursor-pointer"
        />
      </CardContent>

      <CardFooter className="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">Início</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                value={hora}
                onChange={e => setHora(e.target.value)}
                step="60" // garante que NÃO aparecem segundos
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-black" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
}