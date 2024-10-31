import multer from 'multer';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUserController,
  patchUserController,
  patchUserThemeController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import { updateThemeSchema, updateUserSchema } from '../validation/auth.js';

const userRouter = Router();
const upload = multer();

userRouter.use('/', authenticate);

userRouter.get('/current', ctrlWrapper(getCurrentUserController));
userRouter.patch(
  '/theme',
  validateBody(updateThemeSchema),
  ctrlWrapper(patchUserThemeController),
);

userRouter.patch(
  '/edit',
  upload.single('photoUrl'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default userRouter;
