import { Response } from 'express';
import { DeleteResult } from 'typeorm';
import { IRequestExtendet } from '../interfaces';
import { IUser, IWishlist, IWishlistItem } from '../entity';
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

    public async getWishlistItems(req: IRequestExtendet, res: Response): Promise<Response<IWishlistItem[] | null>> {
        try {
            const { id } = req.wishlist as IWishlist;
            const wishlistItems = await wishlistService.getWishlistItems(+id);

            return res.json(wishlistItems);
        } catch (e) {
            return res.status(404).json(e);
        }
    }

    public async addWishlistItem(req: IRequestExtendet, res: Response): Promise<Response<IWishlistItem>> {
        try {
            const wishlistId = req.wishlist?.id as number;
            const itemId = req.item?.id as number;

            const newWishlistItem = await wishlistService.addWishlistItem(wishlistId, itemId);
            return res.json(newWishlistItem);
        } catch (e) {
            return res.status(404).json(e);
        }
    }

    public async deleteWishlistItem(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        try {
            const { wishlistItemId } = req.params;

            const deletedWishlistItem = await wishlistService.deleteWishlistItem(+wishlistItemId);
            return res.json(deletedWishlistItem);
        } catch (e) {
            return res.status(404).json(e);
        }
    }
}
export const wishlistController = new WishlistController();
