import { Request, Response } from "express";
import { DetailUserService } from "../../services/User/DetailUserService";

class DetailUserController{
    async handle(req:Request, res:Response){
        const user_id = req.user_id

        const detailUserService = new DetailUserService()

        const userDetail = await detailUserService.execute({user_id:user_id})

        return res.json(userDetail)
    }
}

export {DetailUserController}