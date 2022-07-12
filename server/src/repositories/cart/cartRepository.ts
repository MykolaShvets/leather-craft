import { DeleteResult, Repository } from 'typeorm';

import { Cart, ICart } from '../../entity';
import { AppDataSource } from '../../data-source';
import { ICartRepository } from './cartRepositoryInterface';

class CartRepository extends Repository<Cart> implements ICartRepository {
    public async createCart(userId: number): Promise<ICart> {
        return AppDataSource.manager.getRepository(Cart).save({ userId });
    }

    public async deleteCart(userId: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(Cart).delete({ userId });
    }

    public async getCart(userId: number): Promise<ICart | null> {
        return AppDataSource.manager.getRepository(Cart).findOne({ where: { userId } });
    }
}

export const cartRepository = new CartRepository(Cart, AppDataSource.manager);
