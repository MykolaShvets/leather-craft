import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Comment, IComment } from '../../entity';
import { ICommentsRepository } from './commentsRepositoryInterface';
import { AppDataSource } from '../../data-source';

class CommentsRepository extends Repository<Comment> implements ICommentsRepository {
    public async createComment(userId: number, comment: Partial<IComment>): Promise<IComment> {
        return AppDataSource.manager.getRepository(Comment).save({ userId, ...comment });
    }

    public async getComments(): Promise<IComment[]> {
        return AppDataSource.manager.getRepository(Comment).find();
    }

    public async getByItem(itemId: number): Promise<IComment[]> {
        return AppDataSource.manager.getRepository(Comment).find({ where: { itemId } });
    }

    public async getByUser(userId: number): Promise<IComment[]> {
        return AppDataSource.manager.getRepository(Comment).find({ where: { userId } });
    }

    public async updateById(id: number, data: IComment): Promise<UpdateResult> {
        return AppDataSource.manager.getRepository(Comment).update({ id }, { ...data });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(Comment).delete({ id });
    }
}

export const commentsRepository = new CommentsRepository(Comment, AppDataSource.manager);
