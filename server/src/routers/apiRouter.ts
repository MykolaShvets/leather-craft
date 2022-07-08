import { Router } from 'express';

import { authRouter } from './authRouter';
import { userRouter } from './userRouter';
import { cartRouter } from './cartRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);

export const apiRouter = router;
