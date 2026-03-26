import {z} from "zod"

export const createServiceTypeSchema = z.object({
    body: z.object({
        name: z.string({message: "Precisa ser um texto"}).min(3, {message: "Nome deve ter no mínimo 3 caracteres"})
    })
})