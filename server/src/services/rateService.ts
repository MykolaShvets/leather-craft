import { DeleteResult } from 'typeorm';

import { IRate } from '../entity';
import { rateRepository } from '../repositories';

class RateService {
    public async deleteRate(rateId: number): Promise<DeleteResult> {
        const deletedRate = await rateRepository.deleteRate(rateId);
        return deletedRate;
    }

    public async getByUserId(userId: number): Promise<IRate[]> {
        const userRates = await rateRepository.getByUserId(userId);
        return userRates;
    }

    public async getByItemId(itemId: number): Promise<IRate[]> {
        const itemRate = await rateRepository.getByItemId(itemId);
        return itemRate;
    }

    public async createRate(itemId: number, userId: number, rate: number): Promise<IRate> {
        const newRate = await rateRepository.createRate(itemId, userId, rate);
        return newRate;
    }
}

export const rateService = new RateService();
