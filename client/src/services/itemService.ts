import { authAxiosService, axiosService } from './axiosService';
import { urls } from '../configs/url';
import { IItem } from '../interfaces/itemInterface';
import { IFilterItems } from '../interfaces/filterItemInterface';

export const itemService = {
    getAll: (page: number) => axiosService.get(`${urls.items}?page=${page}&limit=20`),
    getById: (id: number) => axiosService.get(`${urls.items}/${id}`),
    editById: (data: IItem, id: number) => authAxiosService.patch(`${urls.items}/${id}`, data),
    addItem: (data: IItem) => authAxiosService.post(urls.items, data),
    deleteById: (id: number) => authAxiosService.delete(`${urls.items}/${id}`),
    getByFilter: (page: number, filterObject: IFilterItems) => {
        const categoryIdStr = filterObject.categoryId ? `&categoryId=${filterObject.categoryId}` : '';
        const colorIdStr = filterObject.colorId ? `&colorId=${filterObject.colorId}` : '';
        const materialIdStr = filterObject.materialId ? `&materialId=${filterObject.materialId}` : '';
        return axiosService.get(
            `${urls.items}?page=${page}&limit=20${categoryIdStr}${colorIdStr}${materialIdStr}`,
        );
    },
};
