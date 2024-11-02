import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/smtp.js';

const template = fs
  .readFileSync(path.join(TEMPLATES_PATH, 'generate-email-to-support.html'))
  .toString();

export const generateToSupportEmail = ({ name, userMessage, email }) => {
  const handlebarsTemplate = Handlebars.compile(template);
  return handlebarsTemplate({ name, userMessage, email });
};
