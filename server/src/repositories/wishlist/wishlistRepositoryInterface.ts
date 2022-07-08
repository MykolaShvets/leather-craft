import { DeleteResult } from 'typeorm';

import { IWishlist } from '../../entity';

export interface IWishlistRepository{
    createWishlist(userId: number): Promise<IWishlist>;
    deleteWishlist(userId: number): Promise<DeleteResult>;
    getWishlist(userId: number): Promise<IWishlist | null>;
}
