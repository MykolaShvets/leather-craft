import { DeleteResult, Repository } from 'typeorm';

import { CartItem, ICartItem } from '../../entity';
import { ICartItemRepository } from './cartItemRepositoryInterface';
import { AppDataSource } from '../../data-source';

class CartItemRepository extends Repository<CartItem> implements ICartItemRepository {
    public async addCartItem(cartId: number, itemId: number): Promise<ICartItem> {
        return AppDataSource.manager.getRepository(CartItem).save({ cartId, itemId });
    }

    public async getCartItems(cartId: number): Promise<ICartItem[] | null> {
        return AppDataSource.manager.getRepository(CartItem).find({ where: { cartId } });
    }

    public async deleteCartItem(cartItemId: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(CartItem).delete({ id: cartItemId });
    }
}

export const cartItemRepository = new CartItemRepository(CartItem, AppDataSource.manager);
