import { Repository, DeleteResult } from 'typeorm';

import { AppDataSource } from '../../data-source';
import { Rate, IRate } from '../../entity';
import { IRateRepository } from './rateRepositoryInterface';

class RateRepository extends Repository<Rate> implements IRateRepository {
    public async createRate(itemId: number, userId: number, rate: number): Promise<IRate> {
        return AppDataSource.manager.getRepository(Rate).save({ itemId, userId, rate });
    }

    public async getById(id: number): Promise<IRate | null > {
        return AppDataSource.manager.getRepository(Rate).findOne({ where: { id } });
    }

    public async getByItemId(itemId: number): Promise<IRate[]> {
        return AppDataSource.manager.getRepository(Rate).find({ where: { itemId } });
    }

    public async getByUserId(userId: number): Promise<IRate[]> {
        return AppDataSource.manager.getRepository(Rate).find({ where: { userId } });
    }

    public async deleteRate(id: number): Promise<DeleteResult> {
        return AppDataSource.manager.getRepository(Rate).delete({ id });
    }
}

export const rateRepository = new RateRepository(Rate, AppDataSource.manager);
