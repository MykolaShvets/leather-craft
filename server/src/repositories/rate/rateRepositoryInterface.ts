import { DeleteResult } from 'typeorm';

import { IRate } from '../../entity';

export interface IRateRepository {
    createRate(itemId: number, userId: number, rate: number): Promise<IRate>;
    getById(id: number): Promise<IRate | null >;
    getByItemId(itemId: number): Promise<IRate[]>;
    getByUserId(userId: number): Promise<IRate[]>;
    deleteRate(id: number): Promise<DeleteResult>;
}
