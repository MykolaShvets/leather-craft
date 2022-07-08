import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { userService } from '../services';
import { userValidator } from '../validators';

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

    public async validateCreateUser(req: IRequestExtendet, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidator.createUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    public async validateLoginUser(req: IRequestExtendet, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidator.loginUser.validate(req.body);
            if (error) {
                throw new Error('Wrong login or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
