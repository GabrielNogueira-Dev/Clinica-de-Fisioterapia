import { Request, Response } from "express";
import { ListAppointmentsByUserService } from "../../services/Appointments/ListAppointmentsByUserService";

class ListAppointmentsByUserController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id

        const ListService = new ListAppointmentsByUserService();

        const ListByIdUser = await ListService.execute(user_id)
        
            res.status(200).json(ListByIdUser)
    }
}

export { ListAppointmentsByUserController }