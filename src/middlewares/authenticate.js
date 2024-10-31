import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader)
    return next(createHttpError(401, 'Please provide Authorization header'));
  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !accessToken)
    return next(createHttpError(401, 'Auth header should be of type Bearer'));

  const session = await SessionsCollection.findOne({ accessToken });
  if (!session) return next(createHttpError(401, 'Session not found'));

  const isSessionTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isSessionTokenExpired)
    return next(createHttpError(401, 'Access token is expired!'));

  const user = await UsersCollection.findById({ _id: session.userId });
  if (!user) return next(createHttpError(401, 'User not found'));

  req.user = user;
  next();
};
