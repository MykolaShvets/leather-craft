import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { rateRepository } from '../repositories';

class RateMiddleware {
    public async checkIsRateExist(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const { rateId } = req.params;
            const rateFromDb = await rateRepository.getById(+rateId);

            if (rateFromDb) {
                throw new Error('Rate is not exist');
            }

            next();
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const rateMiddleware = new RateMiddleware();
