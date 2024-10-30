import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, registerUserController } from '../controllers/auth.js';
import { loginUserSchema, registrationUserSchema } from '../validation/auth.js';
import { validateBody} from "../utils/validateBody.js"

const authRouter = Router();

authRouter.post('/register', validateBody(registrationUserSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController))

export default authRouter;
