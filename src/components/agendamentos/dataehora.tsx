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

export default function DataHora() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Card size="sm" className="mx-auto w-fit border border-[#e9eaec]" lang="pt-br">
      <CardContent >
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
            <FieldLabel htmlFor="time-from">Inicio</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:00:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-black" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="time-to">Fim</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                defaultValue="11:00:00"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className=" text-black" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
