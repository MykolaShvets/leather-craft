import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';

export interface IToken{
    userId: number;
    refreshToken: string;
    accessToken: string;
}

@Entity('tokens', { database: 'leather_craft' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'int',
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        accessToken: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
