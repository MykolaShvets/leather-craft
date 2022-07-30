import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { wishlistService } from '../services';
import { IUser } from '../entity';

class WishlistMiddleware {
    public async checkIsWishlistExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const wishlistFromDb = await wishlistService.getWishlist(id);

            if (!wishlistFromDb) {
                throw new Error('Wrong cart');
            }

            req.wishlist = wishlistFromDb;
            next();
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const wishlistMiddleware = new WishlistMiddleware();
