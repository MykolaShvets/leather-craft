import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { Item } from './item';
import { Wishlist } from './wishlist';

export interface IWishlistItem{
    wishlistId: number;
    itemId: number;
}

@Entity('wishlistItems', { database: 'leather_craft' })
export class WishlistItem extends CommonFields implements IWishlistItem {
    @Column({
        type: 'int',
    })
        wishlistId: number;

    @Column({
        type: 'int',
    })
        itemId: number;

    @ManyToOne(() => Wishlist)
    @JoinColumn({ name: 'wishlistId' })
        wishlist: Wishlist;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
        item: Item;
}
