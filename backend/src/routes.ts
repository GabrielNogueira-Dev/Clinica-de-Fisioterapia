import { Router, Request,Response,NextFunction } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";


const router = Router()

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)

export { router }