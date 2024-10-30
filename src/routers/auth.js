import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post('/register', ctrlWrapper());

export default authRouter;
