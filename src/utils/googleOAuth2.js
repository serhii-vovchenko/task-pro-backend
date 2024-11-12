import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { GOOGLE_AUTH } from '../constants/google_auth.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env(GOOGLE_AUTH.CLIENT_ID),
  clientSecret: env(GOOGLE_AUTH.CLIENT_SECRET),
  redirectUri: oauthConfig.web.redirect_uris[1],
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async code => {
  try {
    const response = await googleOAuthClient.getToken(code);
    if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: response.tokens.id_token,
    });
    return ticket;
  } catch (error) {
    if (error.status === 400) {
      throw createHttpError(error.status, 'Token is invalid');
    }
  }
};

export const getFullNameFromGoogleTokenPayload = payload => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
