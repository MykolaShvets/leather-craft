import { authAxiosService } from './axiosService';
import { urls } from '../configs/url';

export const wishlistService = {
    getWishlist: () => authAxiosService.get(urls.wishlists),
    getWishlistItems: () => authAxiosService.get(`${urls.wishlists}/wishlist-item`),
    addWishlistItem: (itemId: number) => authAxiosService.post(`${urls.wishlists}/wishlist-item`, { itemId }),
    deleteWishlistItem: (wishlistItemId: number) => authAxiosService.delete(`${urls.wishlists}/wishlist-item/${wishlistItemId}`),
};
