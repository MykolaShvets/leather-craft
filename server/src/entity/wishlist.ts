import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IWishlist{
    id: number;
    userId: number;
}

@Entity('wishlists', { database: 'leather_craft' })
export class Wishlist extends CommonFields implements IWishlist {
    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
