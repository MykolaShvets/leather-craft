import { Router } from 'express';
import { commentsController } from '../controllers';
import { authMiddleware, commentsMiddleware, itemMiddleware } from '../middlewares';

const router = Router();

router.get('/', commentsController.getComments);
router.get('/:userId', commentsController.getByUser);
router.get('/:itemId', commentsController.getByItem);
router.post('/', authMiddleware.checkAccessToken, itemMiddleware.checkIsItemExist, commentsController.createComment);
router.patch('/:commentId', authMiddleware.checkAccessToken, commentsMiddleware.checkIsUserAuthor, commentsController.updateById);
router.delete(
    '/:commentId',
    authMiddleware.checkAccessToken,
    commentsMiddleware.checkIsUserAuthor,
    commentsController.deleteById,
);

export const commentRouter = router;
