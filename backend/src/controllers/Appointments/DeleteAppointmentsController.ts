import { Request, Response } from "express";
import { DeleteAppointmentService } from "../../services/Appointments/DeleteAppointmentService";

class DeleteAppointmentController{
    async handle(req:Request, res: Response){

        const AppointmentID = req.query.AppointmentID as string

        const service = new DeleteAppointmentService()

        const idDelete = await service.execute({AppointmentID})

        res.json(idDelete)
    }
}

export { DeleteAppointmentController }