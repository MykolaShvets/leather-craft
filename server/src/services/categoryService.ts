import { ICategory } from '../entity';
import { categoryRepository } from '../repositories';

class CategoryService {
    public async getAll() {
        const categories = await categoryRepository.getAll();
        return categories;
    }

    public async createCategory(category: ICategory) {
        const newCategory = await categoryRepository.createCategory(category);
        return newCategory;
    }

    public async updateById(category: ICategory, id: number) {
        const updatedCategory = await categoryRepository.updateById(category, id);
        return updatedCategory;
    }

    public async deleteById(id: number) {
        const deletedCategory = await categoryRepository.deleteById(id);
        return deletedCategory;
    }
}

export const categoryService = new CategoryService();
