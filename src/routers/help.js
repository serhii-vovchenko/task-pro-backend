import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { helpMailSchema } from '../validation/help.js';
import { helpMailController } from '../controllers/help.js';

const helpMailRouter = Router();

helpMailRouter.post(
  '/help',
  validateBody(helpMailSchema),
  ctrlWrapper(helpMailController),
);

export default helpMailRouter;
