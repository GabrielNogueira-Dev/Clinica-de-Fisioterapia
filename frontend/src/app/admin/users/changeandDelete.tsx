"use client";

import { api } from "@/services/api";
import { toast } from "react-toastify";

// ALTERAR
export async function alterarMarcacao(
  appointmentId: string,
  data: any
) {
  try {
    const response = await api.put(
      `/appointments/${appointmentId}`,
      data
    );

    return response.data;
  } catch (err) {
    console.log("Erro ao atualizar marcação", err);
    throw err;
  }
}

// BUSCAR
export async function chamarMarcacao(userId: string) {

  try {

    const response = await api.get("/ursersDetails");

    // users vêm dentro de data
    const users = response.data.data;

    // procura user
    const usuario = users.find(
      (item: any) => item.id === userId
    );

    // se não existir
    if (!usuario) {
      toast.error("Usuário não encontrado");
      return [];
    }

    console.log("Marcações:", usuario.appointments);

    return usuario.appointments;

  } catch (err) {

    toast.error("Erro ao carregar seus agendamentos");

    console.error(err);

    return [];
  }
}

// DELETAR
export async function deletarMarcacao( appointmentId: string) {
  try {
    await api.delete(`/appointments/${appointmentId}`);
    toast.success("Agendamento cancelado");
    
  } catch (err) {
    toast.error("Erro ao tentar deletar marcação");
    console.log(err);
  }
}