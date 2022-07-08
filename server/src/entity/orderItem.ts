import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IOrderItem{
    userId: number;
    itemId: number;
}

@Entity('orderItems', { database: 'leather_craft' })
export class OrderItem extends CommonFields implements IOrderItem {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'int',
    })
        itemId: number;
}
