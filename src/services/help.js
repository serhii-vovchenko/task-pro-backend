import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { helpMail } from '../utils/helpMail.js';
import { generateHelpEmail } from '../utils/generateHelpEmail.js';
import { env } from '../utils/env.js';
import { SMTP } from '../constants/smtp.js';
import { generateToSupportEmail } from '../utils/generateToSupportEmail.js';

export const helpMailService = async (email, message) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  try {
    const emailByUser = await helpMail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'We are always ready to help you',
      html: generateHelpEmail({
        name: user.name,
        userMessage: message,
      }),
    });

    const emailToSupport = await helpMail({
      from: env(SMTP.SMTP_FROM),
      to: 'taskpro.project@gmail.com',
      subject: 'Support request',
      html: generateToSupportEmail({
        name: user.name,
        userMessage: message,
        email: user.email,
      }),
    });

    return emailByUser, emailToSupport;
  } catch (error) {
    console.error('Error sending email:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
