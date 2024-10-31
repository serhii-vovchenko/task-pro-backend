import { Router } from 'express';
import {
  createColumnController,
  deleteColumnController,
  updateColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const columnsRouter = Router();

columnsRouter.post('/', ctrlWrapper(createColumnController));

columnsRouter.patch('/:columnId', ctrlWrapper(updateColumnController));

columnsRouter.delete('/:columnId', ctrlWrapper(deleteColumnController));

export default columnsRouter;
