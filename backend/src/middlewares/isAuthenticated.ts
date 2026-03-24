import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}

export function isAuthenticated(req:Request, res:Response, next:NextFunction){

    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).json({error: "Não possui TOKEN"})
    }

    const [, token] = authToken.split(" ") //Aqui ta o TOKEN do user

       try{ //Valida o Token e monstra qual id do usuario que possui este TOKEN com este JWT
        const {sub} = verify(token!, process.env.JWT_SECRET as string) as PayLoad
    
            req.user_id = sub
            return next();
    }catch(err){
        res.status(401).json({error: "Token inválido" + token})
    }
}