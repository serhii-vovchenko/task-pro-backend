import createHttpError from 'http-errors';
import { THIRTY_DAYS } from '../constants/auth.js';
import { loginUser, logoutUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered an user',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const obj = await loginUser(req.body);

  res.cookie('refreshToken', obj.session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', obj.session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully loged in an user!',
    data: {
      user: obj.user,
      accessToken: obj.session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, accessToken] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const sessionId = req.cookies.sessionId;

    if (accessToken && sessionId) {
      await logoutUser(accessToken, sessionId);
    }

    res.clearCookie('sessionId', { httpOnly: true, secure: true });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error);
    next(createHttpError(500, 'Logout failed'));
  }
};
