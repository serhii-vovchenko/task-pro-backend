import multer from 'multer';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addIconsController } from '../controllers/icons.js';

const iconsRouter = Router();
const upload = multer();

iconsRouter.post(
  '/upload',
  upload.single('iconUrl'),
  ctrlWrapper(addIconsController),
);
