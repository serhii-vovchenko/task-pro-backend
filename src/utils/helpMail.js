import nodemailer from 'nodemailer';
import { SMTP } from '../constants/smtp.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const helpMail = async options => {
  try {
    return await transporter.sendMail(options);
  } catch (error) {
    console.error('Nodemailer error:', error);
    throw error;
  }
};
