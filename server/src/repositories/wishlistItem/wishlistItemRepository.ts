import { DeleteResult, Repository } from 'typeorm';

import { IWishlistItem, WishlistItem } from '../../entity';
import { IWishlistItemRepository } from './wishlistItemRepositoryInterface';
import { AppDataSource } from '../../data-source';

class WishlistItemRepository extends Repository<WishlistItem> implements IWishlistItemRepository {
    public async getWishlistItems(id: number): Promise<IWishlistItem[] | null> {
        return AppDataSource.manager.getRepository(WishlistItem).find({ where: { wishlistId: id } });
    }

    public async addWishlistItem(wishlistId: number, itemId: number): Promise<IWishlistItem> {
        return AppDataSource.manager.getRepository(WishlistItem).save({ wishlistId, itemId });
    }

    public async deleteWishlistItem(id: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(WishlistItem).delete({ id });
    }
}

export const wishlistItemRepository = new WishlistItemRepository(WishlistItem, AppDataSource.manager);
