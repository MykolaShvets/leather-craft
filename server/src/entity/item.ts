import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { Color } from './color';
import { Material } from './material';
import { Category } from './category';

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
        nullable: false,
    })
        colorId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        materialId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        categoryId: number;

    @ManyToOne(() => Color)
    @JoinColumn({ name: 'colorId' })
        color: Color;

    @ManyToOne(() => Material)
    @JoinColumn({ name: 'materialId' })
        material: Material;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'categoryId' })
        category: Category;
}
