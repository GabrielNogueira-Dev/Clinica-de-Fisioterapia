import { Request,Response } from "express";
import { CreateAppointmentService } from "../../services/Appointments/CreateAppointmentService";

class CreateAppointmentController{
    async handle(req: Request, res: Response){

        const {userId,description,scheduledAt,serviceTypeID,type,professionalID} = req.body 

        const appointmentService = new CreateAppointmentService();

        const createService = await appointmentService.execute({userId,description,scheduledAt,serviceTypeID,type,professionalID})

        res.status(200).json(createService)
    }
}

export { CreateAppointmentController }