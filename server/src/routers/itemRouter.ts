import { Router } from 'express';
import { itemController } from '../controllers/itemController';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);
router.post('/', authMiddleware.checkAccessToken, itemController.createItem);
router.patch('/:id', authMiddleware.checkAccessToken, itemController.updateById);
router.delete('/:id', authMiddleware.checkAccessToken, itemController.deleteById);

export const itemRouter = router;
