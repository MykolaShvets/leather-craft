import { Router } from 'express';

import { authMiddleware, cartMiddleware, itemMiddleware } from '../middlewares';
import { cartController } from '../controllers';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, cartController.getCart);
router.get(
    '/cart-items',
    authMiddleware.checkAccessToken,
    cartMiddleware.checkIsCartExist,
    cartController.getCartItems,
);
router.post(
    '/cart-items',
    authMiddleware.checkAccessToken,
    cartMiddleware.checkIsCartExist,
    itemMiddleware.checkIsItemExist,
    cartController.addCartItem,
);
router.delete('/cart-items/:cartItemId', authMiddleware.checkAccessToken, cartController.deleteCartItem);

export const cartRouter = router;
