import createHttpError from 'http-errors';
import { THIRTY_DAYS, TWO_HOURS } from '../constants/auth.js';
import {
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = async (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + TWO_HOURS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

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
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  if (accessToken) {
    await logoutUser(accessToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getGoogleOAuthUrlController = async (req, res, next) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { session, user } = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};
