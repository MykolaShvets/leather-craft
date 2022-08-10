import { authAxiosService } from './axiosService';
import { urls } from '../configs/url';

export const cartService = {
    getCart: () => authAxiosService.get(urls.carts),
    getCartItems: () => authAxiosService.get(`${urls.carts}/cart-items`),
    addCartItem: (itemId: number) => authAxiosService.post(`${urls.carts}/cart-items`, { itemId }),
    deleteCartItem: (cartItemId: number) => authAxiosService.delete(`${urls.carts}/cart-items/${cartItemId}`),
};
