import { DeleteResult, UpdateResult } from 'typeorm';
import { IColor } from '../../entity';

export interface IColorRepository {
    getAll(): Promise<IColor[] | null>;
    createColor(color: IColor): Promise<IColor>;
    updateById(color: IColor, id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
}
