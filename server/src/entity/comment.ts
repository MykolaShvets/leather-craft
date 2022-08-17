import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IComment{
    id: number;
    userId: number;
    itemId: number;
    title: string;
    description: string;
}

@Entity('comments', { database: 'leather__craft' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'int',
    })
        itemId: number;

    @Column({
        type: 'varchar',
        width: 250,
        unique: true,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        description: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
