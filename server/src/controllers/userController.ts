import { Request, Response } from 'express';

import { IUser } from '../entity';
import {
    cartService, tokenService, userService, wishlistService,
} from '../services';
import { IRequestExtendet } from '../interfaces';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const newUser = await userService.createUser(req.body);
        return res.json(newUser);
    }

    public async getAll(req: IRequestExtendet, res: Response): Promise<Response<IUser[]>> {
        const { role } = req.user as IUser;

        if (role !== 'admin') {
            return res.json('You are not admin. Only admin can get users list');
        }

        const allUsers = await userService.getAll();
        return res.json(allUsers);
    }

    public async getByEmail(req: IRequestExtendet, res: Response): Promise<Response<IUser>> {
        const { role } = req.user as IUser;

        if (role !== 'admin') {
            return res.json('You are not admin. Only admin can get another users data');
        }
        const { email } = req.params;
        const userByEmail = await userService.getByEmail(email);
        return res.json(userByEmail);
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<IUser>> {
        const { role } = req.user as IUser;
        let changedData;
        if (role !== 'admin') {
            changedData = { ...req.body, role: 'user' };
        }
        const changedUserId = +req.params.id;
        const updatedUser = await userService.updateById(changedData, changedUserId);
        return res.json(updatedUser);
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<any>> {
        const { role, id } = req.user as IUser;
        const deletedUserId = +req.params.id;
        if (role !== 'admin' && id !== deletedUserId) {
            return res.json('You can delete only your profile');
        }
        const deletedUser = await userService.deleteById(deletedUserId);
        await cartService.deleteCart(deletedUserId);
        await wishlistService.deleteWishlist(deletedUserId);
        await tokenService.deleteUserTokenPair(deletedUserId);
        return res.json(deletedUser);
    }
}

export const userController = new UserController();
