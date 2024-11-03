import { Router } from 'express';
import {
  createColumnController,
  deleteColumnAndTasksController,
  getColumnsController,
  updateColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validation/columns.js';
import { isValid } from '../middlewares/isValid.js';
import tasksRouter from './tasks.js';
import { addColumnIdToReq } from '../middlewares/addColumnIdToReq.js';
// import { addBoardIdToReq } from '../middlewares/addBoardIdToReq.js';

const columnsRouter = Router();

columnsRouter.use(authenticate);
// columnsRouter.use(addBoardIdToReq);

columnsRouter.use('/:columnId', isValid('columnId'), addColumnIdToReq);

columnsRouter.use('/:columnId/tasks', tasksRouter);

columnsRouter.get('/', ctrlWrapper(getColumnsController));
columnsRouter.post(
  '/',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnController),
);
columnsRouter.patch(
  '/:columnId',
  validateBody(updateColumnSchema),
  ctrlWrapper(updateColumnController),
);
columnsRouter.delete('/:columnId', ctrlWrapper(deleteColumnAndTasksController));

export default columnsRouter;
