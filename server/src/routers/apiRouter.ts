import { Router } from 'express';

import { authRouter } from './authRouter';
import { userRouter } from './userRouter';
import { cartRouter } from './cartRouter';
import { wishlistRouter } from './wishlistRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/wishlists', wishlistRouter);

export const apiRouter = router;
