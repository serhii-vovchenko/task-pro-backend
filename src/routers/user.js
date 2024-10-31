import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUserController,
  patchUserThemeController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import { updateThemeSchema } from '../validation/auth.js';

const userRouter = Router();

userRouter.use('/', authenticate);

userRouter.get('/current', ctrlWrapper(getCurrentUserController));
userRouter.patch(
  '/theme',
  validateBody(updateThemeSchema),
  ctrlWrapper(patchUserThemeController),
);

export default userRouter;
