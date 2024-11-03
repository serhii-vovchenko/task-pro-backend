import createHttpError from 'http-errors';

export const addBoardIdToReq = async (req, res, next) => {
  try {
    if (!req.params.boardId) {
      return next(createHttpError(400, 'Bad request. BoardId is missing'));
    }
    req.body.boardId = req.params.boardId;
    next();
  } catch (error) {
    next(error);
  }
};
