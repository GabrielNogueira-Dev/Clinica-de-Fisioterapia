import { Response } from "express";
import { ListServicesService } from "../../services/ServiceType/ListServices";

class ListServicesController{
    async handle( res: Response){

        const listServices = new ListServicesService()

        const servicos = await listServices.execute()

        res.status(200).json(servicos)

    }
}

export {ListServicesController}