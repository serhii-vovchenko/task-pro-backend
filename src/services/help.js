import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { helpMail } from '../utils/helpMail.js';
// import { generateHelpEmail } from '../utils/generateHelpEmail.js';
import { env } from '../utils/env.js';
import { SMTP, TEMPLATES_PATH } from '../constants/smtp.js';
import path from 'node:path';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';

export const helpMailService = async (email, message) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const helpTemplatePath = path.join(TEMPLATES_PATH, 'generate-email.html');
  const templateSource = await fs.readFile(helpTemplatePath, 'utf8');
  const template = Handlebars.compile(templateSource);
  const html = template({ name: user.name, userMessage: message });

  try {
    await helpMail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'We are always ready to help you',
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
