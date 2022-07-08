import { wishlistRepository } from '../repositories';

class WishlistService {
    public async createWishlist(userId: number) {
        const newWishlist = await wishlistRepository.createWishlist(userId);
        return newWishlist;
    }

    public async deleteWishlist(userId: number) {
        const deletedWishlist = await wishlistRepository.deleteWishlist(userId);
        return deletedWishlist;
    }
}

export const wishlistService = new WishlistService();
