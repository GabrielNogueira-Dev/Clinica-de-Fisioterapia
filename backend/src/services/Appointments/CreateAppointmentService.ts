import prismaClient from "../../prisma";
import { CreateAppointmentDTO } from "../../types/Tipagens";
import { AppointmentStatus } from "../../generated/prisma/enums";

class CreateAppointmentService{
    async execute(userId:string,data:CreateAppointmentDTO){

try{
    
    const {description,scheduledAt,serviceTypeID,type,professionalID} = data

        const createAppointment = await prismaClient.appointment.create({
            data: {
              userId,
              description,
              scheduledAt,
              serviceTypeID,
              type,
             professionalID: professionalID || null,
             status: AppointmentStatus.CONFIRMED,
            }
        })
return createAppointment
}catch(err){
    console.log(err)
    return {success: false, message: "Falha ao fazer marcação"}
}
    }
}

export { CreateAppointmentService }