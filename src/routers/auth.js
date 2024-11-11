import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registrationUserSchema,
} from '../validation/auth.js';
import { validateBody } from '../utils/validateBody.js';

const authRouter = Router();

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/register',
  validateBody(registrationUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
