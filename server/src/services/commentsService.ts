import { DeleteResult, UpdateResult } from 'typeorm';
import { IComment } from '../entity';

import { commentsRepository } from '../repositories';

class CommentsService {
    public async createComment(userId: number, comment: Partial<IComment>): Promise<IComment> {
        const newComment = await commentsRepository.createComment(userId, comment);
        return newComment;
    }

    public async getComments(): Promise<IComment[]> {
        const comments = await commentsRepository.getComments();
        return comments;
    }

    public async getByItem(itemId: number): Promise<IComment[]> {
        const comments = await commentsRepository.getByItem(itemId);
        return comments;
    }

    public async getByUser(userId: number): Promise<IComment[]> {
        const comments = await commentsRepository.getByUser(userId);
        return comments;
    }

    public async updateById(commentId: number, data: IComment): Promise<UpdateResult> {
        const updatedComment = await commentsRepository.updateById(commentId, data);
        return updatedComment;
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        const deletedComment = await commentsRepository.deleteById(id);
        return deletedComment;
    }
}

export const commentsService = new CommentsService();
