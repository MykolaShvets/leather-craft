import { DeleteResult, Repository } from 'typeorm';

import { IWishlist, Wishlist } from '../../entity';
import { AppDataSource } from '../../data-source';
import { IWishlistRepository } from './wishlistRepositoryInterface';

class WishlistRepository extends Repository<Wishlist> implements IWishlistRepository {
    public async createWishlist(userId: number): Promise<IWishlist> {
        return AppDataSource.manager.getRepository(Wishlist).save({ userId });
    }

    public async deleteWishlist(userId: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(Wishlist).delete({ userId });
    }

    public async getWishlist(userId: number): Promise<IWishlist | null> {
        return AppDataSource.manager.getRepository(Wishlist).findOne({ where: { userId } });
    }
}

// @ts-ignore
export const wishlistRepository = new WishlistRepository();
