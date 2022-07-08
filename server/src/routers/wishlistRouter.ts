import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import { wishlistController } from '../controllers';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, wishlistController.getWishlist);

export const wishlistRouter = router;
