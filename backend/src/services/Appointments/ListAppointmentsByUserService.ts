import { AppointmentStatus } from "../../generated/prisma/enums";
import prismaClient from "../../prisma";



class ListAppointmentsByUserService{
    async execute(user_id:string){
        const ListByuser = await prismaClient.appointment.findMany({
            where : {
                userId: user_id,
                status:  AppointmentStatus.CONFIRMED 
            },
            select:{
                user:{
                    select:{
                       id:true,
                        name:true,
                        appointments:{
                            select:{
                                id:true,
                                type:true,
                                status:true,
                            },
                        }
                    }
                },
                serviceType:{
                    select:{
                        id:true,
                        banner:true
                    }
                },
                status: true,
                scheduledAt: true,
                description: true,
                id: true
            },
            orderBy:{
                scheduledAt: "asc"
            }
        })
        console.log(ListByuser)
        return ListByuser
    }
}

export { ListAppointmentsByUserService }