import { Router, Request,Response,NextFunction } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, loginUserSchema } from "./schemas/userSchema";
import { LoginUserController } from "./controllers/User/LoginUserController";


const router = Router()

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)

router.post("/session", validateSchema(loginUserSchema), new LoginUserController().handle)

export { router }