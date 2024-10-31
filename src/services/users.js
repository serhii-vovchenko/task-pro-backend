import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const getUserByToken = async accessToken => {
  const session = await SessionsCollection.findOne({ accessToken });
  if (!session) return createHttpError(404, 'Session not found');
  return await UsersCollection.findById(session.userId);
};
