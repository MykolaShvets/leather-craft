import { Router } from 'express';
import { authMiddleware, itemMiddleware, wishlistMiddleware } from '../middlewares';
import { wishlistController } from '../controllers';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, wishlistController.getWishlist);
router.get(
    '/wishlist-item',
    authMiddleware.checkAccessToken,
    wishlistMiddleware.checkIsWishlistExist,
    wishlistController.getWishlistItems,
);
router.post(
    '/wishlist-item',
    authMiddleware.checkAccessToken,
    wishlistMiddleware.checkIsWishlistExist,
    itemMiddleware.checkIsItemExist,
    wishlistController.addWishlistItem,
);
router.delete('/wishlist-item/:wishlistItemId', authMiddleware.checkAccessToken, wishlistController.deleteWishlistItem);

export const wishlistRouter = router;
