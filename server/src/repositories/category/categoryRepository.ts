import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Category, ICategory } from '../../entity';
import { ICategoryRepository } from './categoryRepositoryInterface';
import { AppDataSource } from '../../data-source';

class CategoryRepository extends Repository<Category> implements ICategoryRepository {
    public async getAll(): Promise<ICategory[] | null> {
        return AppDataSource.manager
            .getRepository(Category)
            .find();
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        return AppDataSource.manager
            .getRepository(Category)
            .save(category);
    }

    public async updateById(category: ICategory, id: number): Promise<UpdateResult> {
        const { name } = category;

        return AppDataSource.manager
            .getRepository(Category)
            .update({ id }, { name });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(Category)
            .delete({ id });
    }
}

// @ts-ignore
export const categoryRepository = new CategoryRepository();
