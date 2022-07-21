import { authAxiosService, axiosService } from './axiosService';
import { urls } from '../configs/url';
import { IItem } from '../interfaces/itemInterface';

export const itemService = {
    getAll: () => axiosService.get(urls.items),
    getById: (id: number) => axiosService.get(`${urls.items}/${id}`),
    editById: (data: IItem, id: number) => authAxiosService.patch(`${urls.items}/${id}`, data),
    addItem: (data: IItem) => authAxiosService.post(urls.items, data),
    deleteById: (id: number) => authAxiosService.delete(`${urls.items}/${id}`),
};
