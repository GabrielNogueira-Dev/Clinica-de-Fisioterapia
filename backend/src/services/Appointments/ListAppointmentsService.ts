import prismaClient from "../../prisma";

class ListAppointmentsService{
    async execute(){

        

        const list = await prismaClient.appointment.findMany({
            select: {
                user:{
                    select:{
                        id:true,
                        name:true,
                        appointments:true,
                        createdAt:true
                    }
                },
                description:true,
                id: true,
                type:true,
                status:true,
                serviceType:true,

            }
        })
            return list
    }
}

export { ListAppointmentsService }