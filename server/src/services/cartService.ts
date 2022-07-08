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
}

export const cartService = new CartService();
