import { DeleteResult } from 'typeorm';

import { ICartItem } from '../../entity';

export interface ICartItemRepository {
    addCartItem(cartId: number, itemId: number): Promise<ICartItem>;
    getCartItems(cartId: number): Promise<ICartItem[] | null>;
    deleteCartItem(cartItemId: number): Promise<DeleteResult>;
}
