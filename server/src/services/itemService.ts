import { IItem } from '../entity';
import { itemRepository } from '../repositories';
import { UpdateResult } from 'typeorm';

class ItemService {
    public async createItem(item: IItem):Promise<IItem> {
        const newItem = await itemRepository.createItem(item);
        return newItem;
    }

    public async getAll(): Promise< IItem[] | null> {
        const items = await itemRepository.getAll();
        return items;
    }

    public async getById(itemId: number):Promise<IItem | null> {
        const item = await itemRepository.getById(itemId);
        return item;
    }

    public async updateById(item: IItem, itemId: number):Promise<UpdateResult> {
        const updatedItem = await itemRepository.updateById(item, itemId);
        return updatedItem;
    }

    public async deleteById(itemId: number) {
        const deletedItem = await itemRepository.deleteById(itemId);
        return deletedItem;
    }
}

export const itemService = new ItemService();
