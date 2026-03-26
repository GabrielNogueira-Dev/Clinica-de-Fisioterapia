import { Request,Response, } from "express";
import { CreateServiceTypeService } from "../../services/ServiceType/CreateServicesService";


class ServicesController{
    async handle(req:Request, res:Response){
        const {name} = req.body

        const servicesTypeService = new CreateServiceTypeService()
        
        const service = await servicesTypeService.execute({name:name})

        res.json(service)
   console.log(service)
    }
}

export {ServicesController}