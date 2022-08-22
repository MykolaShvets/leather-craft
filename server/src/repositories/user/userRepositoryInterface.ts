import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../../entity';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;
    getAll(): Promise<IUser[] | null>;
    getById(id: number): Promise<IUser | null>
    getByEmail(email: string): Promise<IUser | null>;
    updateById(user: IUser, id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
}
