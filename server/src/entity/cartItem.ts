import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface ICartItem{
    userId: number;
    itemId: number;
}

@Entity('cartItems', { database: 'leather_craft' })
export class CartItem extends CommonFields implements ICartItem {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'int',
    })
        itemId: number;
}
