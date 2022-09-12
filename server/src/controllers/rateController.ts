import { Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IRequestExtendet } from '../interfaces';
import { IUser, IRate } from '../entity';
import { rateService } from '../services';

class RateController {
    public async deleteRate(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        try {
            const { rateId } = req.params;
            const deletedRate = await rateService.deleteRate(+rateId);
            return res.json(deletedRate);
        } catch (e) {
            return res.status(403).json(e);
        }
    }

    public async getByUserId(req: IRequestExtendet, res: Response): Promise<Response<IRate[]>> {
        try {
            const { id } = req.user as IUser;
            const userRates = await rateService.getByUserId(id);
            return res.json(userRates);
        } catch (e) {
            return res.status(403).json(e);
        }
    }

    public async createRate(req: IRequestExtendet, res: Response): Promise<Response<IRate>> {
        try {
            const { itemId } = req.params;
            const userId = req.user?.id;
            const { rate } = req.body;
            const newRate = await rateService.createRate(+itemId, userId as number, rate);
            return res.json(newRate);
        } catch (e) {
            return res.status(403).json(e);
        }
    }

    public async getByItemId(req: IRequestExtendet, res: Response): Promise<Response<IRate[]>> {
        try {
            const { itemId } = req.params;
            const itemRates = await rateService.getByItemId(+itemId);
            return res.json(itemRates);
        } catch (e) {
            return res.status(403).json(e);
        }
    }
}

export const rateController = new RateController();
