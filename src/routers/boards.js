import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { getAllBoardsController } from '../controllers/boards';

const bordersRouter = Router();

bordersRouter.use('/', authenticate);

bordersRouter.get('/', ctrlWrapper(getAllBoardsController));

export default bordersRouter;
