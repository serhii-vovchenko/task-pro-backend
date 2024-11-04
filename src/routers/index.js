import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import columnsRouter from './columns.js';
import helpMailRouter from './help.js';
import boardsRouter from './boards.js';
// import tasksRouter from './tasks.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
// router.use('/tasks', tasksRouter);
router.use('/', helpMailRouter);

export default router;
