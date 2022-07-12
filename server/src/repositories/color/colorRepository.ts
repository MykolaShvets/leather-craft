import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Color, IColor } from '../../entity';
import { AppDataSource } from '../../data-source';
import { IColorRepository } from './colorRepositoryInterface';

class ColorRepository extends Repository<Color> implements IColorRepository {
    public async getAll(): Promise<IColor[] | null> {
        return AppDataSource.manager
            .getRepository(Color)
            .find();
    }

    public async createColor(color: IColor): Promise<IColor> {
        return AppDataSource.manager
            .getRepository(Color)
            .save(color);
    }

    public async updateById(color: IColor, id: number): Promise<UpdateResult> {
        const { name } = color;

        return AppDataSource.manager
            .getRepository(Color)
            .update({ id }, { name });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(Color)
            .delete({ id });
    }
}

// @ts-ignore
export const colorRepository = new ColorRepository();
