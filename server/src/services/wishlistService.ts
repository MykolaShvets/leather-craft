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

    public async getWishlist(userId: number) {
        const wishlist = await wishlistRepository.getWishlist(userId);
        return wishlist;
    }
}

export const wishlistService = new WishlistService();
