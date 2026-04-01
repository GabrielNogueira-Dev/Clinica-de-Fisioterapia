import { Request, Response } from "express";
import { DeleteAppointmentService } from "../../services/Appointments/DeleteAppointmentService";

class DeleteAppointmentController{
    async handle(req:Request, res: Response){

        const AppointmentID = req.params.id as any //ou req.params.AppointmentID se quisesse por na route.ts ao invez de :id

        const service = new DeleteAppointmentService()

        const idDelete = await service.execute({AppointmentID})
        console.log(typeof AppointmentID)
       return res.json(idDelete)
       
    }
}

export { DeleteAppointmentController }