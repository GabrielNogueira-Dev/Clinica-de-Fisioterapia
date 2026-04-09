
import prismaClient from "../../prisma";

interface UserDetailProps {
  user_id: string
}

class DetailUserService{
    async execute({user_id}:UserDetailProps){

    try{
            const userDetail = await prismaClient.user.findFirst({
           where: {
            id: user_id
           },
           select:{
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
           }
        })
        if(!userDetail){
            return {success: false, message: "User não existe"}
        }
        return userDetail
        
    }catch(err){
         return {success: false, message: "User não existe ou não encontrado"}
    }
    }
}

export {DetailUserService}