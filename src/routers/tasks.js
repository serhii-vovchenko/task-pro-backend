import multer from 'multer';
import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  moveTaskController,
  updateTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { isValid } from '../middlewares/isValid.js';

const tasksRouter = Router();
const upload = multer();

tasksRouter.use(authenticate);

tasksRouter.use('/:taskId', isValid('taskId'));

tasksRouter.post(
  '/',
  upload.none(),
  validateBody(createTaskSchema),
  ctrlWrapper(createTaskController),
);
tasksRouter.patch(
  '/:taskId',
  upload.none(),
  validateBody(updateTaskSchema),
  ctrlWrapper(updateTaskController),
);
tasksRouter.delete('/:taskId', ctrlWrapper(deleteTaskController));
tasksRouter.patch(
  '/:taskId/move',
  upload.none(),
  ctrlWrapper(moveTaskController),
);

export default tasksRouter;
