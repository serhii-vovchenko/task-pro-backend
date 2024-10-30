import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', ctrlWrapper(registerUserController));

export default authRouter;
