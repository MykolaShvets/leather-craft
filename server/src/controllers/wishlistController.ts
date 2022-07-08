import { Response } from 'express';
import { IRequestExtendet } from '../interfaces';
import { IUser, IWishlist } from '../entity';
import { wishlistService } from '../services';

class WishlistController {
    public async getWishlist(req: IRequestExtendet, res: Response): Promise<Response<IWishlist>> {
        try {
            const { id } = req.user as IUser;

            const wishlist = await wishlistService.getWishlist(id);
            return res.json(wishlist);
        } catch (e) {
            return res.status(404).json(e);
        }
    }
}
export const wishlistController = new WishlistController();
