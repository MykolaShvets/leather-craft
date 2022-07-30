import { DeleteResult, UpdateResult } from 'typeorm';

import { IMaterial } from '../../entity';

export interface IMaterialRepository {
    getAll(): Promise<IMaterial[] | null>;
    getById(id: number): Promise<IMaterial | null>;
    createMaterial(material: IMaterial): Promise<IMaterial>;
    updateById(material: IMaterial, id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
}
