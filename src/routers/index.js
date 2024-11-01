import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import columnsRouter from './columns.js';
import helpMailRouter from './help.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/columns', columnsRouter);
router.use('/support', helpMailRouter);

export default router;
