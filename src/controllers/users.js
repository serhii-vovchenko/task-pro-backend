import createHttpError from 'http-errors';
import { getUserById, patchUser } from '../services/users.js';

export const getCurrentUserController = async (req, res, next) => {
  const user = await getUserById(req?.user?._id);
  if (!user) next(createHttpError(404, 'User not found'));
  res.json({
    status: 200,
    message: 'Succsessfully found user',
    data: user,
  });
};

export const patchUserThemeController = async (req, res, next) => {
  const theme = req.body;
  const user = await patchUser(theme, req?.user?._id);
  res.json({
    data: user,
  });
};
