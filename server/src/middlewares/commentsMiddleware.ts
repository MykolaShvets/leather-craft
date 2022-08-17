import { NextFunction, Response } from 'express';
import { IUser, IComment } from '../entity';
import { IRequestExtendet } from '../interfaces';
import { commentsService } from '../services';

class CommentsMiddleware {
    public async checkIsUserAuthor(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const { commentId } = req.params;
            const commentsFromDb = await commentsService.getByUser(id);
            const commentFromDb = commentsFromDb.filter((comment) => comment.id === +commentId);
            if (!commentFromDb[0]) {
                throw new Error('It isn`t your comment');
            }
            req.comment = commentFromDb[0] as IComment;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const commentsMiddleware = new CommentsMiddleware();
