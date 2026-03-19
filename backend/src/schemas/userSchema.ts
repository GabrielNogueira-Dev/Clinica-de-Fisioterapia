import {z} from "zod"

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({message: "Nome é obrigatório"}).min(3, {message: "O nome deve ter no minimo 3 letras"}),
        email: z.email({message: "Precisa ser um email válido"}),
        password: z.string({message: "Senha obrigatória"}).min(6,{message: "A senha deve possuir no mínimo 6 caracteres"})
        .regex(/[A-Z]/, {message: "A senha deve conter ao menos uma letra maiúscula"})
    } )
})

export const loginUserSchema = z.object({
    body: z.object({
        email: z.email({message: "Email obrigatório"}).min(3, {message: "O nome deve ter mais de 3 letras"}),
        password: z.string({message: "Senha obrigatória"}).min(6, {message: "A senha deve ter no minimo 6 digitos"}).regex(/[A-Z]/, {message: "A senha deve conter uma letra maiuscula"})
    })
})