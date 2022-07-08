import { DeleteResult } from 'typeorm';

import { ICart } from '../../entity';

export interface ICartRepository{
    createCart(userId: number): Promise<ICart>;
    deleteCart(userId: number): Promise<DeleteResult>;
    getCart(userId: number): Promise<ICart | null>;
}
