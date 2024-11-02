import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValid =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];
    return isValidObjectId(id)
      ? next()
      : next(createHttpError(400, 'Invalid id'));
  };
