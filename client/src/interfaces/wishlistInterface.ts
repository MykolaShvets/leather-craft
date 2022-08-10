export interface IWishlist {
  id: number;
  userId: number;
  createdAt?: string;
  deletedAt?: string | null;
}

export interface IWishlistItem {
  id: number;
  wishlistId: number;
  itemId: number;
  createdAt?: string;
  deletedAt?: string | null;
}
