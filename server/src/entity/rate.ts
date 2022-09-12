import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IRate{
    id: number;
    userId: number;
    itemId: number;
    rate: number;
}

@Entity('rates', { database: 'leather_craft' })
export class Rate extends CommonFields implements IRate {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'int',
    })
        itemId: number;

    @Column({
        type: 'int',
    })
        rate: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
