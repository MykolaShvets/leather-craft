import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { cartService } from '../services';
import { IUser } from '../entity';

class CartMiddleware {
    public async checkIsCartExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const cartFromDb = await cartService.getCart(id);

            if (!cartFromDb) {
                throw new Error('Wrong cart');
            }

            req.cart = cartFromDb;
            next();
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const cartMiddleware = new CartMiddleware();
