import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/LoginUserService";

class LoginUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUserService = new LoginUserService();

    try {
      const session = await loginUserService.execute({ email, password });

      return res.status(200).json(session);
    } catch (err: any) {
      return res.status(401).json({
        message: err.message || "Erro ao fazer login"
      });
    }
  }
}

export { LoginUserController };