import { getAllBoards } from '../services/boards';

export const getAllBoardsController = async (req, res) => {
  const boards = await getAllBoards(req.user._id);
  res.json({
    status: 200,
    message: 'Successfully found boards',
    data: boards,
  });
};
