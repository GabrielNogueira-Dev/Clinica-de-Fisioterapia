import { AppointmentStatus } from "../../generated/prisma/enums";
import prismaClient from "../../prisma";

    interface StatusProps{
      AppointmentID : string
    }

    class DeleteAppointmentService{
        async execute({AppointmentID}:StatusProps){

            const deleteStatus = await prismaClient.appointment.update({
                where: {
                    id : AppointmentID
                },
                data: {
                    status: AppointmentStatus.CANCELLED
                }
            })
             console.log("PARAM ID:", deleteStatus);
            return deleteStatus

        }
    }

    export { DeleteAppointmentService }