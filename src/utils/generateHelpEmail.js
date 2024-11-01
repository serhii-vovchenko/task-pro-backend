import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/smtp.js';

const template = fs
  .readFileSync(path.join(TEMPLATES_PATH, 'generate-email.html'))
  .toString();

export const generateHelpEmail = ({ name, userMessage }) => {
  const handlebarsTemplate = Handlebars.compile(template);
  return handlebarsTemplate({ name, userMessage });
};
