import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IItem, Item } from '../../entity';
import { IItemRepository } from './itemRepositoryInterface';
import { AppDataSource } from '../../data-source';

class ItemRepository extends Repository<Item> implements IItemRepository {
    public async createItem(item: IItem): Promise<IItem> {
        return AppDataSource.manager
            .getRepository(Item)
            .save(item);
    }

    public async getAll(): Promise<IItem[] | null> {
        return AppDataSource.manager
            .getRepository(Item)
            .find();
    }

    public async getById(id: number): Promise<IItem | null> {
        return AppDataSource.manager
            .getRepository(Item)
            .findOne({ where: { id } });
    }

    public async updateById(item: IItem, id: number): Promise<UpdateResult> {
        const {
            name, width, materialId, amount, colorId, imageUrl, height, categoryId, price, sale, description,
        } = item;

        return AppDataSource.manager
            .getRepository(Item)
            .update({ id }, {
                name, width, materialId, amount, colorId, imageUrl, height, categoryId, price, sale, description,
            });
    }

    public async deleteById(id: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(Item)
            .softDelete({ id });
    }
}

export const itemRepository = new ItemRepository(Item, AppDataSource.manager);
