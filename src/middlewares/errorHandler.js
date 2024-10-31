import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error.name,
    });
  }

  if (error.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error!',
      data: error.details.map(error => ({
        message: error.message,
        path: error.path,
      })),
    });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
