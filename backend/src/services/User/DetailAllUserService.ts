import prismaClient from "../../prisma";

class DetailAllUserService {
  async execute() {
    try {

      const listUsers = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,

          appointments: {
            select: {
              id: true,
              description: true,
              type: true,
              status: true,
              serviceType: true,
              scheduledAt: true
            }
          }
        }
      });

      return listUsers;

    } catch (err) {
      return {
        success: false,
        message: "Erro ao buscar usuários"
      };
    }
  }
}

export { DetailAllUserService };