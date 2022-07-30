import { Router } from 'express';

import { materialController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', materialController.getAll);
router.get('/:id', materialController.getById);
router.post('/', authMiddleware.checkAccessToken, materialController.createMaterial);
router.patch('/:id', authMiddleware.checkAccessToken, materialController.updateById);
router.delete('/:id', authMiddleware.checkAccessToken, materialController.deleteById);

export const materialRouter = router;
