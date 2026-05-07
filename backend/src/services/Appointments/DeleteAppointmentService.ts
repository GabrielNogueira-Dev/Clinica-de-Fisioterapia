import { AppointmentStatus } from "../../generated/prisma/enums";
import prismaClient from "../../prisma";

interface StatusProps {
  AppointmentID: string;
}

class DeleteAppointmentService {
  async execute({ AppointmentID }: StatusProps) {

    // 1. cancela o agendamento
    const deleteStatus = await prismaClient.appointment.update({
      where: {
        id: AppointmentID,
      },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    console.log("CANCELADO:", deleteStatus);

    // 2. limpa automaticamente cancelados com +30 dias
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 30);

    const deletedOld = await prismaClient.appointment.deleteMany({
      where: {
        status: AppointmentStatus.CANCELLED,
        updatedAt: {
          lt: limitDate,
        },
      },
    });

    console.log("LIMPEZA AUTOMÁTICA:", deletedOld.count);

    return deleteStatus;
  }
}

export { DeleteAppointmentService };