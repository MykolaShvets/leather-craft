import { Router } from 'express';

import { authMiddleware } from '../middlewares';
import { cartController } from '../controllers';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, cartController.getCart);

export const cartRouter = router;
