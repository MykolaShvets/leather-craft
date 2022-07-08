import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IOrder{
    id: number;
    userId: number;
    status: string;
}

@Entity('orders', { database: 'leather_craft' })
export class Order extends CommonFields implements IOrder {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        status: string;
}
