import { cartItemRepository, cartRepository } from '../repositories';

class CartService {
    public async createCart(userId: number) {
        const newCart = await cartRepository.createCart(userId);

        return newCart;
    }

    public async deleteCart(userId: number) {
        const deletedCart = await cartRepository.deleteCart(userId);

        return deletedCart;
    }

    public async getCart(userId: number) {
        const cart = await cartRepository.getCart(userId);

        return cart;
    }

    public async addCartItem(cartId: number, itemId: number) {
        const newCartItem = await cartItemRepository.addCartItem(cartId, itemId);

        return newCartItem;
    }

    public async getCartItems(cartId: number) {
        const cartItems = await cartItemRepository.getCartItems(cartId);

        return cartItems;
    }

    public async deleteCartItem(cartItemId: number) {
        const deletedCartItem = await cartItemRepository.deleteCartItem(cartItemId);
        return deletedCartItem;
    }
}

export const cartService = new CartService();
