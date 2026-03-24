import { Request,Response, } from "express";
import { ServiceTypeService } from "../../services/ServiceType/ServicesService";


class ServicesController{
    async handle(req:Request, res:Response){
        const {name} = req.body

        const servicesTypeService = new ServiceTypeService()
        
        const service = await servicesTypeService.execute({name:name})

        res.json(service)
   console.log(service)
    }
}

export {ServicesController}