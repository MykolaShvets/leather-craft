import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { config } from '../configs';

class UserService {
    public async createUser(user: IUser) {
        const { password } = user;
        const hashedPass = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPass };
        const newUser = await userRepository.createUser(dataToSave);
        return newUser;
    }

    public async getAll() {
        const allUsers = await userRepository.getAll();
        return allUsers;
    }

    public async getById(id: number) {
        const userById = await userRepository.getById(id);
        return userById;
    }

    public async getByEmail(email: string) {
        const userByEmail = await userRepository.getByEmail(email);
        return userByEmail;
    }

    public async updateById(user: IUser, id: number) {
        const updatedUser = await userRepository.updateById(user, id);
        return updatedUser;
    }

    public async deleteById(id: number) {
        const deletedUser = await userRepository.deleteById(id);
        return deletedUser;
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exist');
        }
    }

    private _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT));
    }
}

export const userService = new UserService();
