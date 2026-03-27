import prismaClient from "../../prisma";
import { CreateAppointmentDTO } from "../../types/Tipagens";
import { AppointmentStatus } from "../../generated/prisma/enums";

class CreateAppointmentService{
    async execute({userId,description,scheduledAt,serviceTypeID,type,professionalID}: CreateAppointmentDTO){
try{
    
        const createAppointment = await prismaClient.appointment.create({
            data: {
              userId: userId,
              description: description,
              scheduledAt:scheduledAt,
              serviceTypeID: serviceTypeID,
              type: type,
             professionalID: professionalID || null,
             status: AppointmentStatus.PENDING,
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