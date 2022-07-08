import { cartRepository } from '../repositories';

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
}

export const cartService = new CartService();
