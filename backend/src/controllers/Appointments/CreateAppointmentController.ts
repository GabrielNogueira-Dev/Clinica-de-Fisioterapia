import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { CreateAppointmentService } from "../../services/Appointments/CreateAppointmentService";

class CreateAppointmentController {
  async handle(req: Request, res: Response) {
    try {
      const authUserId = req.user_id;

      const {
        userId,
        description,
        scheduledAt,
        serviceTypeID,
        type,
        professionalID,
      } = req.body;

      console.log("BODY RECEBIDO:", req.body);

      const user = await prismaClient.user.findUnique({
        where: { id: authUserId },
      });

      if (!user) {
        return res.status(404).json({ error: "User não encontrado" });
      }

      const appointmentService = new CreateAppointmentService();

      const result = await appointmentService.execute(authUserId, {
        userId,
        description,
        scheduledAt,
        serviceTypeID,
        type,
        professionalID,
      });

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao criar marcação" });
    }
  }
}

export { CreateAppointmentController };