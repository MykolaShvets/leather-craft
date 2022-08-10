import { Response, NextFunction } from 'express';

import { IRequestExtendet } from '../interfaces';
import { itemService } from '../services';

class ItemMiddleware {
    public async checkIsItemExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const { itemId } = req.body;
            const itemFromDb = await itemService.getById(itemId);

            if (!itemFromDb) {
                throw new Error('Wrong item');
            }

            req.item = itemFromDb;

            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const itemMiddleware = new ItemMiddleware();
