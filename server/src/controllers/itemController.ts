import { Response } from 'express';

import { DeleteResult } from 'typeorm';
import { IRequestExtendet } from '../interfaces';
import { IItem, IUser } from '../entity';
import { itemService } from '../services';

class ItemController {
    public async createItem(req: IRequestExtendet, res: Response): Promise<Response<IItem>> {
        try {
            const { role } = req.user as IUser;

            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const newItem = await itemService.createItem(req.body);
            return res.json(newItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getAll(res: Response): Promise<Response<IItem[] | null>> {
        try {
            const items = await itemService.getAll();
            return res.json(items);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getById(req: IRequestExtendet, res: Response): Promise<Response<IItem>> {
        try {
            const itemId = +req.params;
            const item = await itemService.getById(itemId);
            return res.json(item);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<IItem>> {
        try {
            const { role } = req.user as IUser;

            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const itemId = +req.params;
            const updatedItem = await itemService.updateById(req.body, itemId);
            return res.json(updatedItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        try {
            const { role } = req.user as IUser;

            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const itemId = +req.params;
            const deletedItem = await itemService.deleteById(itemId);
            return res.json(deletedItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}

export const itemController = new ItemController();
