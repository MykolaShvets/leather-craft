import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { userService } from '../services';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const userFromDb = await userService.getByEmail(req.body.email);

            if (!userFromDb) {
                throw new Error('Wrong login or password!!!');
            }

            req.user = userFromDb;

            next();
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
