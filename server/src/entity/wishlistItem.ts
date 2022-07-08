import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IWishlistItem{
    userId: number;
    itemId: number;
}

@Entity('wishlistItems', { database: 'leather_craft' })
export class wishlistItem extends CommonFields implements IWishlistItem {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'int',
    })
        itemId: number;
}
