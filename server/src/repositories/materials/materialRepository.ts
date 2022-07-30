import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { IMaterial, Material } from '../../entity';
import { AppDataSource } from '../../data-source';
import { IMaterialRepository } from './materialRepositoryInterface';

class MaterialRepository extends Repository<Material> implements IMaterialRepository {
    public async getAll(): Promise<IMaterial[] | null> {
        return AppDataSource.manager
            .getRepository(Material)
            .find();
    }

    public async getById(id: number): Promise<IMaterial | null> {
        return AppDataSource.manager.getRepository(Material).findOne({ where: { id } });
    }

    public async createMaterial(material: IMaterial): Promise<IMaterial> {
        return AppDataSource.manager
            .getRepository(Material)
            .save(material);
    }

    public async updateById(material: IMaterial, id: number): Promise<UpdateResult> {
        const { name } = material;

        return AppDataSource.manager
            .getRepository(Material)
            .update({ id }, { name });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(Material)
            .delete({ id });
    }
}

// @ts-ignore
export const materialRepository = new MaterialRepository();
