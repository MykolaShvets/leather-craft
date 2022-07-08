import { Column, Entity } from 'typeorm';
import { CommonFields } from './commonFields';

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

@Entity('users', { database: 'leather_craft' })
export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        password: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        default: 'user',
    })
        role: string;
}
