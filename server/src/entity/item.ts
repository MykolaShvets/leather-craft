import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IItem{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    sale: number;
    amount: number;
    height: number;
    width: number;
    colorId: number;
    materialId: number;
    categoryId: number;
}

@Entity('items', { database: 'leather_craft' })
export class Item extends CommonFields implements IItem {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        name: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        description: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        imageUrl: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        price: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        sale: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        amount: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        height: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        width: number;

    @Column({
        type: 'int',
    })
        colorId: number;

    @Column({
        type: 'int',
    })
        materialId: number;

    @Column({
        type: 'int',
    })
        categoryId: number;
}
