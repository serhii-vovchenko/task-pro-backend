import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  moveTaskController,
  updateTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const tasksRouter = Router();

tasksRouter.use(authenticate);

tasksRouter.post('/:columnId', ctrlWrapper(createTaskController));
tasksRouter.patch('/:taskId', ctrlWrapper(updateTaskController));
tasksRouter.delete('/:taskId', ctrlWrapper(deleteTaskController));
tasksRouter.patch('/:taskId/move', ctrlWrapper(moveTaskController));

export default tasksRouter;
