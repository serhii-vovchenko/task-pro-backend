import createHttpError from 'http-errors';
import { uploadAndSaveIcon } from '../services/icons.js';

export const addIconsController = async (req, res, next) => {
  const { name } = req.body;

  if (!req.file) {
    return next(createHttpError(400, 'No file uploaded.'));
  }

  const icon = await uploadAndSaveIcon(req.file, name, 'icons');
  res.json({
    status: 200,
    message: 'Icon has saved in DB',
    data: icon,
  });
};
