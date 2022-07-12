import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IMaterial, IUser } from '../entity';
import { materialService } from '../services';
import { IRequestExtendet } from '../interfaces';

class MaterialController {
    public async getAll(req: Request, res: Response): Promise<Response<IMaterial[]>> {
        try {
            const materials = await materialService.getAll();
            return res.json(materials);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async createMaterial(req: IRequestExtendet, res: Response): Promise<Response<IMaterial>> {
        try {
            const { role } = req.user as IUser;
            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const newMaterial = await materialService.createMaterial(req.body);

            return res.json(newMaterial);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateById(req: IRequestExtendet, res: Response): Promise<Response<IMaterial>> {
        try {
            const { role } = req.user as IUser;
            if (role !== 'admin') {
                throw new Error('You are not admin!!!');
            }

            const materialId = +req.params.id;
            const updatedMaterial = await materialService.updateById(req.body, materialId);
            return res.json(updatedMaterial);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteById(req: IRequestExtendet, res: Response): Promise<Response<DeleteResult>> {
        const { role } = req.user as IUser;
        if (role !== 'admin') {
            throw new Error('You are not admin!!!');
        }

        const materialId = +req.params.id;
        const deletedMaterial = await materialService.deleteById(materialId);

        return res.json(deletedMaterial);
    }
}

export const materialController = new MaterialController();
