import createHttpError from 'http-errors';
import { getUserByToken } from '../services/users.js';

export const getCurrentUserController = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const accessToken = authHeader.split(' ')[1];
  const user = await getUserByToken(accessToken);
  if (!user) next(createHttpError(404, 'User not found'));
  res.json({
    status: 200,
    message: 'Succsessfully found user',
    data: user,
  });
};
