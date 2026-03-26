
import prismaClient from "../../prisma";

class ListServicesService{
async execute(){

   try{
     const serviceList = await prismaClient.serviceType.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
        }
    })
    return serviceList
    console.log(serviceList)
   }catch(err){
    return {success: false, error: "Falha ao listar servicos: " + err}
   }

}
}

export {ListServicesService}