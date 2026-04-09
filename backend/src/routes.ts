import { Router, } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, loginUserSchema } from "./schemas/userSchema";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ServicesController } from "./controllers/ServiceType/CreateServicesController";
import { isAdmin } from "./middlewares/isAdmin";
import { createServiceTypeSchema } from "./schemas/serviceSchema";
import { ListServicesController } from "./controllers/ServiceType/ListServicesController";
import { CreateAppointmentController } from "./controllers/Appointments/CreateAppointmentController";
import { DeleteAppointmentController } from "./controllers/Appointments/DeleteAppointmentsController";
import { ListAppointmentsController } from "./controllers/Appointments/ListAppointmentsController";
import { ListAppointmentsByUserController } from "./controllers/Appointments/ListAppointmentsByUserController";


const router = Router()

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)

router.post("/session", validateSchema(loginUserSchema), new LoginUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)

router.post("/serviceType", isAuthenticated, isAdmin, validateSchema(createServiceTypeSchema), new ServicesController().handle)

router.get("/serviceType", isAuthenticated, new ListServicesController().handle)

router.post("/appointments", isAuthenticated, new CreateAppointmentController().handle)

router.delete("/appointments/:id", isAuthenticated, isAdmin , new DeleteAppointmentController().handle)

router.get("/appointments", isAuthenticated , isAdmin , new ListAppointmentsController().handle)

router.get("/appointmentsbyuser", isAuthenticated , new ListAppointmentsByUserController().handle)


export { router }