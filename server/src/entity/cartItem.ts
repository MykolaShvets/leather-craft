import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { Cart } from './cart';
import { Item } from './item';

export interface ICartItem{
    cartId: number;
    itemId: number;
}

@Entity('cartItems', { database: 'leather_craft' })
export class CartItem extends CommonFields implements ICartItem {
    @Column({
        type: 'int',
    })
        cartId: number;

    @Column({
        type: 'int',
    })
        itemId: number;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cartId' })
        cart: Cart;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
        item: Item;
}
