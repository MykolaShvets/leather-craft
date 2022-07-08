import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface INews{
    title: string;
    description: string;
}

@Entity('news', { database: 'leather_craft' })
export class News extends CommonFields implements INews {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        description: string;
}
