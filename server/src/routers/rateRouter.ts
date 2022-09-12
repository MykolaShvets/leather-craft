import { Router } from 'express';
import { authMiddleware, rateMiddleware } from '../middlewares';
import { rateController } from '../controllers';

const router = Router();

router.get('/item/:itemId', rateController.getByItemId);
router.get('/user', authMiddleware.checkAccessToken, rateController.getByUserId);
router.post('/item/itemId', authMiddleware.checkAccessToken, rateController.createRate);
router.delete('/:rateId', authMiddleware.checkAccessToken, rateMiddleware.checkIsRateExist, rateController.deleteRate);

export const rateRouter = router;
