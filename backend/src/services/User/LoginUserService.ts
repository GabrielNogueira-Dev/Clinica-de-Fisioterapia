 import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

interface UserLoginProps{
    email: string;
    password: string
}

 class LoginUserService {
    async execute({email, password}:UserLoginProps){

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
               
            }
        })
        if(!user){
            throw new Error("Email/Password obrigatório(a)")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorreto(a)")
        }

        //Gerar o token abaixo
        const token = sign({
            name: user.name, email: user.email},
             process.env.JWT_SECRET as string,{
            subject: user.id, expiresIn: "60d"
           })
           return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
           }
    }
   
 }

 export {LoginUserService}