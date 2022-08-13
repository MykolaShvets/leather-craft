import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IItem, Item } from '../../entity';
import { IItemRepository } from './itemRepositoryInterface';
import { AppDataSource } from '../../data-source';
import { IPaginationResponse } from '../../interfaces/pagnitionResponseInterface';

class ItemRepository extends Repository<Item> implements IItemRepository {
    public async createItem(item: IItem): Promise<IItem> {
        return AppDataSource.manager
            .getRepository(Item)
            .save(item);
    }

    public async getAll(): Promise<IItem[] | null> {
        return AppDataSource.manager
            .getRepository(Item).createQueryBuilder('item')
            .getMany();
    }

    public async getById(id: number): Promise<IItem | null> {
        return AppDataSource.manager
            .getRepository(Item).createQueryBuilder('item').where('item.id = :id', { id }).getOne();
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

    public async getItemByPage(
        searchObject: Partial<IItem>,
        limit: number,
        page: number,
    )
        : Promise<IPaginationResponse<IItem>> {
        const skip = limit * (page - 1);
        const [items, totalCount] = await AppDataSource.manager
            .getRepository(Item).findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            limit,
            totalCount,
            data: items,
        };
    }
}

export const itemRepository = new ItemRepository(Item, AppDataSource.manager);
