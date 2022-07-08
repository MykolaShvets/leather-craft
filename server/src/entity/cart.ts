import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface ICart{
    id: number;
    userId: number;
}

@Entity('carts', { database: 'leather_craft' })
export class Cart extends CommonFields implements ICart {
    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
