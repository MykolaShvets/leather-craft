import { authAxiosService } from './axiosService';
import { urls } from '../configs/url';
import { IUserForm } from '../interfaces/userFormInterface';

export const userService = {
    getByEmail: (email: string) => authAxiosService.get(`${urls.user}/${email}`),
    updateById: (data: IUserForm, id: number) => authAxiosService.patch(`${urls.user}/${id}`, data),
    deleteById: (id: number) => authAxiosService.delete(`${urls.user}/${id}`),
};
