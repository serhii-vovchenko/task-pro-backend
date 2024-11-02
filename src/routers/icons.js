import multer from 'multer';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addIconsController } from '../controllers/icons.js';
import { authenticate } from '../middlewares/authenticate.js';

const iconsRouter = Router();
const upload = multer();

iconsRouter.use('/', authenticate);

iconsRouter.post(
  '/upload',
  upload.single('iconUrl'),
  ctrlWrapper(addIconsController),
);
