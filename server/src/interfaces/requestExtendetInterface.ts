import { Request } from 'express';

import {
    ICart, IItem, IUser, IWishlist,
} from '../entity';

export interface IRequestExtendet extends Request{
    user?: IUser;
    cart?: ICart;
    wishlist?: IWishlist;
    item?: IItem;
}
