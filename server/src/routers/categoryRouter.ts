import { Router } from 'express';
import { categoryController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', authMiddleware.checkAccessToken, categoryController.createCategory);
router.patch('/:id', authMiddleware.checkAccessToken, categoryController.updateById);
router.delete('/:id', authMiddleware.checkAccessToken, categoryController.deleteById);

export const categoryRouter = router;
