import createHttpError from 'http-errors';
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getBackgroundsAndIcons,
  getBoardByIdAndMakeBoardActive,
  updateBoard,
} from '../services/boards.js';

export const getAllBoardsController = async (req, res) => {
  const boards = await getAllBoards(req.user._id);
  res.json({
    status: 200,
    message: 'Successfully found boards',
    data: boards,
  });
};

export const getBoardByIdAndMakeBoardActiveController = async (
  req,
  res,
  next,
) => {
  const { boardId } = req.params;
  const { previous_boardId } = req.query;
  const userId = req.user._id;
  const board = await getBoardByIdAndMakeBoardActive({
    boardId,
    userId,
    previous_boardId,
  });
  if (!board) return next(createHttpError(404, 'Board not found'));
  res.json({
    status: 200,
    message: `Successfully found contact with id ${boardId}!`,
    data: board,
  });
};

export const addBoardController = async (req, res) => {
  const board = await addBoard({ ...req.body, userId: req.user._id });
  res.json({
    status: 200,
    message: 'Successfully created a board',
    data: board,
  });
};

export const updateBoardController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  const board = await updateBoard({ ...req.body, boardId, userId });
  res.json({
    status: 200,
    message: 'Successfully patched a board!',
    data: board,
  });
};

export const deleteBoardByIdController = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  const board = await deleteBoard(boardId, userId);
  if (!board) return next(createHttpError(404, 'Board not found'));
  res.status(204).send();
};

export const getBackgroundsAndIconsController = async (req, res) => {
  const boardDetails = await getBackgroundsAndIcons();
  res.json({
    status: 200,
    message: 'Successfully found icons and backgrounds',
    data: boardDetails,
  });
};
