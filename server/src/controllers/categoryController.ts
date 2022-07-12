import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { ICategory, IUser } from '../entity';
import { categoryService } from '../services';
import { IRequestExtendet } from '../interfaces';

class CategoryController {
    public async getAll(req: Request, res: Response): Promise<Response<ICategory[]>> {
        try {
            const categories = await categoryService.getAll();
            return res.json(categories);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async createCategory(req: IRequestExtendet, res: Response): Promise<Response<ICategory>> {
        try {
            const { role } = req.user as IUser;
            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const newCategory = await categoryService.createCategory(req.body);

            return res.json(newCategory);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<ICategory>> {
        try {
            const { role } = req.user as IUser;
            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const categoryId = +req.params.id;
            const updatedCategory = await categoryService.updateById(req.body, categoryId);
            return res.json(updatedCategory);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        const { role } = req.user as IUser;
        if (role !== 'admin') {
            throw new Error('You are not admin!!!');
        }

        const categoryId = +req.params.id;
        const deletedCategory = await categoryService.deleteById(categoryId);

        return res.json(deletedCategory);
    }
}

export const categoryController = new CategoryController();
