import createHttpError from 'http-errors';

export const addColumnIdToReq = async (req, res, next) => {
  console.log(req.params);
  try {
    if (!req.params.columnId) {
      return next(createHttpError(400, 'Bad request. ColumnId is missing'));
    }
    req.columnId = req.params.columnId;
    console.log(req.columnId);
    next();
  } catch (error) {
    next(error);
  }
};
