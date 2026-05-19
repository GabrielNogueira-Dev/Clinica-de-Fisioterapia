import { Request, Response } from "express";
import { PutAppointmentService } from "../../services/Appointments/PutAppointmentServices";

class PutAppointmentController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, scheduledAt, description, type } = req.body;

      const service = new PutAppointmentService();

      const result = await service.execute({
        id,
        status,
        scheduledAt,
        description,
        type,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar marcação",
      });
    }
  }
}

export { PutAppointmentController };