import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/LoginUserService";

class LoginUserController {
    async handle(req:Request, res:Response){
        const {email, password} = req.body
      
        const loginUserService =  new LoginUserService()

        const session = await loginUserService.execute({email, password})

        res.json(session)
    }
}

export {LoginUserController}