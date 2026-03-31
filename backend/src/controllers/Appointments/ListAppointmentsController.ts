import { Request, Response } from "express";
import { ListAppointmentsService } from "../../services/Appointments/ListAppointmentsService";

class ListAppointmentsController{
    async handle(req:Request,res:Response){

        const listservice = new ListAppointmentsService();
        const renderList = await listservice.execute();
        res.status(200).json({
            message: "Listagem concluída",
            data: renderList
        });
    }
    
}

export { ListAppointmentsController }