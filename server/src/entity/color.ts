import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IColor{
    name: string;
}

@Entity('colors', { database: 'leather_craft' })
export class Color extends CommonFields implements IColor {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        name: string;
}
