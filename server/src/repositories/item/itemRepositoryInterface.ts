import { DeleteResult, UpdateResult } from 'typeorm';
import { IItem } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IItemRepository {
    createItem(item: IItem): Promise<IItem>;
    getAll(): Promise<IItem[] | null>;
    getById(id: number): Promise<IItem | null>;
    updateById(item: IItem, id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
    getItemByPage(searchObject: Partial<IItem>, limit: number, page: number): Promise<IPaginationResponse<IItem>>;
}
