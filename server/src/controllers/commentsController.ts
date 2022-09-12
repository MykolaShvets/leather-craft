import { Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IComment, IUser } from '../entity';
import { IRequestExtendet } from '../interfaces';
import { commentsService } from '../services';

class CommentsController {
    public async createComment(req: IRequestExtendet, res: Response): Promise<Response<IComment>> {
        try {
            const { id } = req.user as IUser;
            const comment = req.body;
            const newComment = await commentsService.createComment(id, comment);
            return res.json(newComment);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getComments(req: IRequestExtendet, res: Response): Promise<Response<IComment[]>> {
        try {
            const comments = await commentsService.getComments();
            return res.json(comments);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getByItem(req: IRequestExtendet, res: Response): Promise<Response<IComment[]>> {
        try {
            const { itemId } = req.params;

            const comments = await commentsService.getByItem(+itemId);
            return res.json(comments);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getByUser(req: IRequestExtendet, res: Response): Promise<Response<IComment[]>> {
        try {
            const { userId } = req.params;

            const comments = await commentsService.getByUser(+userId);
            return res.json(comments);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<IComment>> {
        try {
            const { commentId } = req.params;
            const updatedComment = await commentsService.updateById(+commentId, req.body);

            return res.json(updatedComment);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        try {
            const { commentId } = req.params;
            const deletedComment = await commentsService.deleteById(+commentId);
            return res.json(deletedComment);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}

export const commentsController = new CommentsController();
