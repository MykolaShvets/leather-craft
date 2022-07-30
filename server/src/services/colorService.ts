import { IColor } from '../entity';
import { colorRepository } from '../repositories';

class ColorService {
    public async getAll() {
        const colors = await colorRepository.getAll();
        return colors;
    }

    public async getById(id: number) {
        const color = await colorRepository.getById(id);
        return color;
    }

    public async createColor(color: IColor) {
        const newColor = await colorRepository.createColor(color);
        return newColor;
    }

    public async updateById(color: IColor, id: number) {
        const updatedColor = await colorRepository.updateById(color, id);
        return updatedColor;
    }

    public async deleteById(id: number) {
        const deletedColor = await colorRepository.deleteById(id);
        return deletedColor;
    }
}

export const colorService = new ColorService();
