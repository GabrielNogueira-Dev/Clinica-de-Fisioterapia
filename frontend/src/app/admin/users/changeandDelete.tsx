import { api } from "@/services/api";

// ALTERAR MARCAÇÃO
export async function alterarMarcacao(appointmentId: string, data: any) {
  try {
    const response = await api.put(`/appointments/${appointmentId}`, data);
    return response.data;
  } catch (err) {
    console.log("Erro ao atualizar marcação", err);
    throw err;
  }
}

// DELETAR MARCAÇÃO
export async function deletarMarcacao(appointmentId: string) {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (err) {
    console.log("Erro ao deletar marcação", err);
    throw err;
  }
}