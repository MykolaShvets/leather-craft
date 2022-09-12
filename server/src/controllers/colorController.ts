import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IColor, IUser } from '../entity';
import { colorService } from '../services';
import { IRequestExtendet } from '../interfaces';

class ColorController {
    public async getAll(req: Request, res: Response): Promise<Response<IColor[]>> {
        try {
            const colors = await colorService.getAll();
            return res.json(colors);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getById(req: Request, res: Response): Promise<Response<IColor>> {
        try {
            const { id } = req.params;
            const color = await colorService.getById(+id);
            return res.json(color);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async createColor(req: IRequestExtendet, res: Response): Promise<Response<IColor>> {
        try {
            const { role } = req.user as IUser;

            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const newColor = await colorService.createColor(req.body);

            return res.json(newColor);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<IColor>> {
        try {
            const { role } = req.user as IUser;

            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const colorId = +req.params.id;
            const updatedColor = await colorService.updateById(req.body, colorId);
            return res.json(updatedColor);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        const { role } = req.user as IUser;

        if (role !== 'admin') {
            throw new Error('You are not admin!!!');
        }

        const colorId = +req.params.id;
        const deletedColor = await colorService.deleteById(colorId);

        return res.json(deletedColor);
    }
}

export const colorController = new ColorController();
