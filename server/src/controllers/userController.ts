import { Request, Response } from 'express';

import { IUser } from '../entity';
import { cartService, tokenService, userService, wishlistService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const newUser = await userService.createUser(req.body);
        return res.json(newUser);
    }

    public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
        const allUsers = await userService.getAll();
        return res.json(allUsers);
    }

    public async getByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await userService.getByEmail(email);
        return res.json(userByEmail);
    }

    public async updateById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const updatedUser = await userService.updateById(req.body, +id);
        return res.json(updatedUser);
    }

    public async deleteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedUser = await userService.deleteById(+id);
        await cartService.deleteCart(+id);
        await wishlistService.deleteWishlist(+id);
        await tokenService.deleteUserTokenPair(+id);
        res.json(deletedUser);
    }
}

export const userController = new UserController();
