import { Request } from 'express';

import { IUser } from '../entity';

export interface IRequestExtendet extends Request{
    user?: IUser
}
