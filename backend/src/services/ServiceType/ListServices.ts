
import prismaClient from "../../prisma";

class ListServicesService{
async execute(){

   try{
     const serviceList = await prismaClient.serviceType.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    console.log(serviceList)
    return serviceList
   }catch(err){
    return {success: false, error: "Falha ao listar servicos: " + err}
   }

}
}

export {ListServicesService}