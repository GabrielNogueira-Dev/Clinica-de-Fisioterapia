import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
 
 interface CreateUserProps{
    name: string;
    email: string;
    password: string
 }
 
 
 class CreateUserService{
    async execute({name,email,password} :CreateUserProps){
        //console.log(name,email,password)

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email : email
            }
        })
        if(userAlreadyExists){
            return {success:false, message: "Usuário ja cadastrado com este e-mail"}
        }

        const hashpassword = await hash(password,8)

        const user = await prismaClient.user.create({
         data:{
            name: name,
            email: email,
            password: hashpassword
         },
         select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true

         }
        })

        return user
    }
 }

 export { CreateUserService }