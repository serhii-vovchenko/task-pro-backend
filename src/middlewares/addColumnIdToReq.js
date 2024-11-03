import createHttpError from 'http-errors';

export const addColumnIdToReq = async (req, res, next) => {
  try {
    if (!req.params.columnId) {
      return next(createHttpError(400, 'Bad request. ColumnId is missing'));
    }
    req.columnId = req.params.columnId;
    next();
  } catch (error) {
    next(error);
  }
};
