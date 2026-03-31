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
                    status: "CANCELLED"
                }
            })
            
            return deleteStatus

        }
    }

    export { DeleteAppointmentService }