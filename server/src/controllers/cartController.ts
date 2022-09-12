import { Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IRequestExtendet } from '../interfaces';
import { ICart, ICartItem, IUser } from '../entity';
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

    public async addCartItem(req: IRequestExtendet, res: Response): Promise<Response<ICartItem>> {
        try {
            const cartId = req.cart?.id as number;
            const itemId = req.item?.id as number;
            const newCartItem = cartService.addCartItem(cartId, itemId);
            return res.json(newCartItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getCartItems(req: IRequestExtendet, res: Response): Promise<Response<ICartItem[] | null>> {
        try {
            const { id } = req.cart as ICart;
            const cartItems = await cartService.getCartItems(id);
            return res.json(cartItems);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteCartItem(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        try {
            const { cartItemId } = req.params;
            const deletedCartItem = await cartService.deleteCartItem(+cartItemId);
            return res.json(deletedCartItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}

export const cartController = new CartController();
