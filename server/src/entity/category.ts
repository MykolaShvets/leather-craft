import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface ICategory{
    name: string;
}

@Entity('categories', { database: 'leather_craft' })
export class Category extends CommonFields implements ICategory {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        name: string;
}
