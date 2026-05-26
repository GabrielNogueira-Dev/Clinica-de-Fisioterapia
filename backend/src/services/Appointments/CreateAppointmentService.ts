import prismaClient from "../../prisma";
import { CreateAppointmentDTO } from "../../types/Tipagens";
import { AppointmentStatus } from "../../generated/prisma/enums";

class CreateAppointmentService {
  async execute(authUserId: string, data: CreateAppointmentDTO & { userId?: string }) {
    try {
      const {
        userId,
        description,
        scheduledAt,
        serviceTypeID,
        type,
        professionalID,
      } = data;

      // fallback seguro
      const finalUserId = userId ?? authUserId;

      if (!finalUserId) {
        throw new Error("UserId inválido");
      }

      const createAppointment = await prismaClient.appointment.create({
        data: {
          userId: finalUserId,
          description,
          scheduledAt,
          serviceTypeID,
          type,
          professionalID: professionalID || null,
          status: AppointmentStatus.CONFIRMED,
        },
      });

      return createAppointment;
    } catch (err) {
      console.log(err);
      return { success: false, message: "Falha ao fazer marcação" };
    }
  }
}

export { CreateAppointmentService };