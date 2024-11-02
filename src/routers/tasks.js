import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const tasksRouter = Router();

tasksRouter.post('/', ctrlWrapper(createTaskController));
tasksRouter.patch('/:taskId', ctrlWrapper(updateTaskController));
tasksRouter.delete('/:taskId', ctrlWrapper(deleteTaskController));

export default tasksRouter;
