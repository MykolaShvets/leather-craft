import { DeleteResult, UpdateResult } from 'typeorm';
import { ICategory } from '../../entity';

export interface ICategoryRepository {
    getAll(): Promise<ICategory[] | null>;
    createCategory(category: ICategory): Promise<ICategory>;
    updateById(category: ICategory, id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
}
