import { Column, Entity } from 'typeorm';
import { CommonFields } from './commonFields';

export interface IRate{
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
}
