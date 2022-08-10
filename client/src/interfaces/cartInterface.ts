export interface ICart {
    id: number;
    userId: number;
    createdAt?: string;
    deletedAt?: string | null;
}

export interface ICartItem {
    id: number;
    cartId: number;
    itemId: number;
    createdAt?: string;
    deletedAt?: string | null;
}
