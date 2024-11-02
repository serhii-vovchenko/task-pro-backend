import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addBoardController,
  deleteBoardByIdController,
  getAllBoardsController,
  getBackgroundsAndIconsController,
  getBoardByIdAndMakeBoardActiveController,
  updateBoardController,
} from '../controllers/boards.js';
import { validateBody } from '../utils/validateBody.js';
import {
  createBoardSchema,
  updateActiveBoardSchema,
  updateBoardSchema,
} from '../validation/board.js';
import { isValid } from '../middlewares/isValid.js';

const boardsRouter = Router();

boardsRouter.use('/', authenticate);

boardsRouter.get('/info', ctrlWrapper(getBackgroundsAndIconsController));

boardsRouter.use('/:boardId', isValid('boardId'));

boardsRouter.get('/', ctrlWrapper(getAllBoardsController));
boardsRouter.get(
  '/:boardId',
  validateBody(updateActiveBoardSchema),
  ctrlWrapper(getBoardByIdAndMakeBoardActiveController),
);

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(addBoardController),
);

boardsRouter.patch(
  '/:boardId',
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);

boardsRouter.delete('/:boardId', ctrlWrapper(deleteBoardByIdController));

export default boardsRouter;
