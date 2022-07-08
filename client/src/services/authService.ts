import { IUser } from '../interfaces/userInterface';
import { axiosService, authAxiosService, refreshAxiosService } from './axiosService';
import { urls } from '../configs/url';
import { ILoginForm } from '../interfaces/loginInterface';

export const authService = {
    registration: (user: IUser) => axiosService.post(`${urls.auth}/registration`, user),
    login: (data: ILoginForm) => axiosService.post(`${urls.auth}/login`, data),
    logout: () => authAxiosService.post(`${urls.auth}/logout`),
    refresh: () => refreshAxiosService.post(`${urls.auth}/refresh`),
};
