import { Router, } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, loginUserSchema } from "./schemas/userSchema";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ServicesController } from "./controllers/ServiceType/ServicesController";
import { isAdmin } from "./middlewares/isAdmin";
import { createServiceTypeSchema } from "./schemas/serviceSchema";


const router = Router()

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)

router.post("/session", validateSchema(loginUserSchema), new LoginUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)

router.post("/servicetype", isAuthenticated, isAdmin, validateSchema(createServiceTypeSchema), new ServicesController().handle)

export { router }