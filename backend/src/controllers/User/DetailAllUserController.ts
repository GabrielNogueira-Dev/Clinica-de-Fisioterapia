import { Request, Response } from "express";
import { DetailAllUserService } from "../../services/User/DetailAllUserService";

class DetailAllUserController {
  async handle(_req: Request, res: Response) {

    const listUserService = new DetailAllUserService();

    const renderListUsers = await listUserService.execute();

    return res.status(200).json({
      message: "Listagem concluída",
      data: renderListUsers
    });
  }
}

export { DetailAllUserController };