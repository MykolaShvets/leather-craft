import { authAxiosService, axiosService } from './axiosService';
import { urls } from '../configs/url';

export const itemPropsService = {
    getAllColors: () => axiosService.get(urls.colors),
    getColorById: (id: number) => axiosService.get(`${urls.colors}/${id}`),
    addColor: (name: string) => authAxiosService.post(urls.colors),
    editColor: (newName: string, id: number) => authAxiosService.patch(`${urls.colors}/${id}`, newName),
    deleteColor: (id: number) => authAxiosService(`${urls.colors}/${id}`),
    getAllMaterials: () => axiosService.get(urls.materials),
    getMaterialById: (id: number) => axiosService.get(`${urls.materials}/${id}`),
    addMaterial: (name: string) => authAxiosService.post(urls.materials),
    editMaterial: (newName: string, id: number) => authAxiosService.patch(`${urls.materials}/${id}`, newName),
    deleteMaterial: (id: number) => authAxiosService(`${urls.materials}/${id}`),
    getAllCategories: () => axiosService.get(urls.categories),
    getCategoryById: (id: number) => axiosService.get(`${urls.categories}/${id}`),
    addCategory: (name: string) => authAxiosService.post(urls.categories),
    editCategory: (newName: string, id: number) => authAxiosService.patch(`${urls.categories}/${id}`, newName),
    deleteCategory: (id: number) => authAxiosService(`${urls.categories}/${id}`),
};
