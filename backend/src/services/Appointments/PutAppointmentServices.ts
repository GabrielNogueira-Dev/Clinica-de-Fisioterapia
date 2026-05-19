import prismaClient from "../../prisma";

class PutAppointmentService {
  async execute(data: any) {
    const appointmentUpdated = await prismaClient.appointment.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.scheduledAt && {
          scheduledAt: new Date(data.scheduledAt),
        }),
        ...(data.description && { description: data.description }),
        ...(data.type && { type: data.type }),
      },
    });

    return appointmentUpdated;
  }
}

export { PutAppointmentService };