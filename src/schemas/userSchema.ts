import {z} from "zod"

export const createUserSchema = z.object({
    body: {
        name: z.string().min(3, {message: "O nome deve ter no minimo 3 letras"}),
        email: z.email({message: "Precisa ser um email válido"}),
        password: z.string().min(6,{message: "A senha deve possuir no mínimo 6 caracteres"})
        .regex(/[A-Z]/, {message: "A senha deve conter ao menos uma letra maiúscula"})
    }
})