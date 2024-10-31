import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUserController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.use('/', authenticate);

userRouter.get('/current', ctrlWrapper(getCurrentUserController));

export default userRouter;
