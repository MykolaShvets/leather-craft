import { Column, Entity } from 'typeorm';

import { CommonFields } from './commonFields';

export interface IMaterial{
    name: string;
}

@Entity('materials', { database: 'leather_craft' })
export class Material extends CommonFields implements IMaterial {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        name: string;
}
