import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from '../configs/url';


const axiosService = axios.create({baseURL});
const authAxiosService = axios.create({baseURL});
const refreshAxiosService = axios.create({baseURL});

const authInterceptor = (config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers['Authorization']= `${localStorage.getItem('accessToken')}`;
    return config
};

const refreshInterceptor = (config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers['Authorization']= `${localStorage.getItem('refreshToken')}`;
    return config
};

authAxiosService.interceptors.request.use(authInterceptor);
refreshAxiosService.interceptors.request.use(refreshInterceptor);

export {
    axiosService,
    authAxiosService,
    refreshAxiosService
};

