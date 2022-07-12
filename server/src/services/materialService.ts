import { IMaterial } from '../entity';
import { materialRepository } from '../repositories';

class MaterialService {
    public async getAll() {
        const materials = await materialRepository.getAll();
        return materials;
    }

    public async createMaterial(material: IMaterial) {
        const newMaterial = await materialRepository.createMaterial(material);
        return newMaterial;
    }

    public async updateById(material: IMaterial, id: number) {
        const updatedMaterial = await materialRepository.updateById(material, id);
        return updatedMaterial;
    }

    public async deleteById(id: number) {
        const deletedMaterial = await materialRepository.deleteById(id);
        return deletedMaterial;
    }
}

export const materialService = new MaterialService();
