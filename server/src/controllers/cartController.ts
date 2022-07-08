import { Response } from 'express';
import { IRequestExtendet } from '../interfaces';
import { ICart, IUser } from '../entity';
import { cartService } from '../services';

class CartController {
    public async getCart(req: IRequestExtendet, res: Response): Promise<Response<ICart>> {
        try {
            const { id } = req.user as IUser;
            const cart = await cartService.getCart(id);
            return res.json(cart);
        } catch (e) {
            return res.status(404).json(e);
        }
    }
}

export const cartController = new CartController();
