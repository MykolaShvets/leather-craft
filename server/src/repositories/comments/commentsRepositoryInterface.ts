import { DeleteResult, UpdateResult } from 'typeorm';

import { IComment } from '../../entity';

export interface ICommentsRepository {
    createComment(userId: number, comment: Partial<IComment>): Promise<IComment>;
    getComments(): Promise<IComment[]>;
    getByItem(itemId: number): Promise<IComment[]>;
    getByUser(userId: number): Promise<IComment[]>;
    updateById(id: number, data: IComment): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
}
