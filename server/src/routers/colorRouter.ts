import { Router } from 'express';

import { colorController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', colorController.getAll);
router.post('/', authMiddleware.checkAccessToken, colorController.createColor);
router.patch('/:id', authMiddleware.checkAccessToken, colorController.updateById);
router.delete('/:id', authMiddleware.checkAccessToken, colorController.deleteById);

export const colorRouter = router;
