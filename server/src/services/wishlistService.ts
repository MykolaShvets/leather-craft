import { wishlistItemRepository, wishlistRepository } from '../repositories';

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

    public async getWishlistItems(wishlistId: number) {
        const wishlist = await wishlistItemRepository.getWishlistItems(wishlistId);
        return wishlist;
    }

    public async addWishlistItem(wishlistId: number, itemId: number) {
        const wishlistItem = await wishlistItemRepository.addWishlistItem(wishlistId, itemId);
        return wishlistItem;
    }

    async deleteWishlistItem(id: number) {
        const deletedWishlistItem = await wishlistItemRepository.deleteWishlistItem(id);
        return deletedWishlistItem;
    }
}

export const wishlistService = new WishlistService();
