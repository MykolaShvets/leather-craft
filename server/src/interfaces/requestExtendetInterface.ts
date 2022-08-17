import { Request } from 'express';

import {
    ICart, IComment, IItem, IUser, IWishlist,
} from '../entity';

export interface IRequestExtendet extends Request{
    user?: IUser;
    cart?: ICart;
    wishlist?: IWishlist;
    item?: IItem;
    comment?: IComment;
}
