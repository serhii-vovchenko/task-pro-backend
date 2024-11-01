import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import columnsRouter from './columns.js';
// import backgroundsRouter from './backgrounds.js';   // for upload backgrounds to DB

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/columns', columnsRouter);

// router.use('/backgrounds', backgroundsRouter);    // for upload backgrounds to DB

export default router;
