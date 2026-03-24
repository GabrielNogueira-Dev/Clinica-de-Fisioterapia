
import prismaClient from "../../prisma";

import { ServiceTypeProps } from "../../types/Tipagens";



class ServiceTypeService{
    async execute({name}:ServiceTypeProps){
        try{
             const servicesTypes = await prismaClient.serviceType.create({
                data:{
                    name:name
                
                },
                select:{
                    id:true,
                    name:true,
                    createdAt:true,
                }
             })
                    return servicesTypes;
                    console.log(servicesTypes)

        }catch(err){
            return {success:true, message: "Error ao criar categoria: " + err}
        }
    }
}

export {ServiceTypeService}