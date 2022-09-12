import { authAxiosService, axiosService } from './axiosService';
import { urls } from '../configs/url';

export const rateService = {
    getByItemId: (itemId: number) => axiosService.get(`${urls.rates}/item/${itemId}`),
    getByUserId: () => authAxiosService.get(`${urls.rates}/user`),
    createRate: (itemId: number, rate: number) => authAxiosService.post(`${urls.rates}/item/${itemId}`, rate),
    deleteRate: (rateId: number) => authAxiosService.delete(`${urls.rates}/${rateId}`),
};
