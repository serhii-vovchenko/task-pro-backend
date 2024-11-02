import { Router } from 'express';
import {
  createColumnController,
  deleteColumnController,
  updateColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const columnsRouter = Router();

columnsRouter.use(authenticate);

columnsRouter.post('/', ctrlWrapper(createColumnController));
columnsRouter.patch('/:columnId', ctrlWrapper(updateColumnController));
columnsRouter.delete('/:columnId', ctrlWrapper(deleteColumnController));

export default columnsRouter;
