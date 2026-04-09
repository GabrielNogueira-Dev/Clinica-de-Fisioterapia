import { Request, Response } from "express";
import { ListServicesService } from "../../services/ServiceType/ListServices";

class ListServicesController {
    async handle(req: Request, res: Response) {

        const listServices = new ListServicesService();

        const servicos = await listServices.execute();

        return res.status(200).json(servicos);
    }
}

export { ListServicesController };
