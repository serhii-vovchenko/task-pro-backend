import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { THIRTY_DAYS, TWO_HOURS } from '../constants/auth.js';
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

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

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: user.id,
    ...newSession,
  });
  return {
    user,
    session,
  };
};

export const logoutUser = async accessToken => {
  await SessionsCollection.deleteOne({ accessToken });
};

export const loginOrSignupWithGoogle = async code => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401, 'Unauthorized');

  let user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    const pas = randomBytes(10);
    const password = await bcrypt.hash(pas, 14);
    user = await UsersCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      photoUrl: payload.picture,
      password,
    });
  }

  const newSession = createSession();

  return {
    session: await SessionsCollection.create({
      userId: user._id,
      ...newSession,
    }),
    user,
  };
};
