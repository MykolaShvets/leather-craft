import { Router } from 'express';
import { userController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, userController.getAll);
router.get('/:email', authMiddleware.checkAccessToken, userController.getByEmail);
router.patch('/:id', authMiddleware.checkAccessToken, userController.updateById);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteById);

export const userRouter = router;
