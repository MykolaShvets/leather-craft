import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepositoryInterface';
import { AppDataSource } from '../../data-source';

class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return AppDataSource.manager.getRepository(User).save(user);
    }

    public async getAll(): Promise<IUser[] | null> {
        return AppDataSource.manager
            .getRepository(User)
            .createQueryBuilder('user')
            .getMany();
    }

    public async getById(id: number): Promise<IUser | null> {
        return AppDataSource.manager.getRepository(User).findOne({ where: { id } });
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return AppDataSource.manager
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async updateById(user: IUser, id: number): Promise<UpdateResult> {
        const {
            firstName, lastName, email, role, password, phone,
        } = user;

        return AppDataSource.manager
            .getRepository(User)
            .update({ id }, {
                firstName, lastName, email, role, password, phone,
            });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(User)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository(User, AppDataSource.manager);
