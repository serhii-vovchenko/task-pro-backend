import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { THIRTY_DAYS, TWO_HOURS } from '../constants/auth.js';

export const registerUser = async registrationData => {
  const user = await UsersCollection.findOne({ email: registrationData.email });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPwd = await bcrypt.hash(registrationData.password, 10);

  return await UsersCollection.create({
    ...registrationData,
    password: encryptedPwd,
  });
};

export const loginUser = async loginData => {
  const user = await UsersCollection.findOne({ email: loginData.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(loginData.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized!');

  await SessionsCollection.deleteOne({ userId: user.id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user.id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async sessionId => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
