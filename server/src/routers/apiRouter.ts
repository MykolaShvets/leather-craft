import { Router } from 'express';

import { authRouter } from './authRouter';
import { userRouter } from './userRouter';
import { cartRouter } from './cartRouter';
import { wishlistRouter } from './wishlistRouter';
import { categoryRouter } from './categoryRouter';
import { colorRouter } from './colorRouter';
import { materialRouter } from './materialRouter';
import { itemRouter } from './itemRouter';
import { commentRouter } from './commentRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/wishlists', wishlistRouter);
router.use('/categories', categoryRouter);
router.use('/colors', colorRouter);
router.use('/materials', materialRouter);
router.use('/items', itemRouter);
router.use('/comments', commentRouter);

export const apiRouter = router;
