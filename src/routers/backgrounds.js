import multer from 'multer';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addBackgroundsController } from '../controllers/backgrounds.js';
import { authenticate } from '../middlewares/authenticate.js';

const backgroundsRouter = Router();
const upload = multer();

backgroundsRouter.use('/', authenticate);

backgroundsRouter.post(
  '/upload',
  upload.fields([
    { name: 'name', maxCount: 1 },
    { name: 'modalUrl', maxCount: 1 },
    { name: 'mobile', maxCount: 1 },
    { name: 'tablet', maxCount: 1 },
    { name: 'desktop', maxCount: 1 },
  ]),
  ctrlWrapper(addBackgroundsController),
);
