import { urls } from '../configs/url';
import { IComment } from '../interfaces/commentsInterface';
import { authAxiosService, axiosService } from './axiosService';

export const commentsService = {
    getByUserId: (userId: number) => axiosService.get(`${urls.comments}/by-user/${userId}`),
    getByItemId: (itemId: number) => axiosService.get(`${urls.comments}/by-item/${itemId}`),
    createComment: (comment: IComment) => authAxiosService.post(urls.comments, comment),
    updateComment: (commentId: number, comment: IComment) => authAxiosService
        .patch(`${urls.comments}/${commentId}`, comment),
    deleteCommentById: (commentId: number) => authAxiosService.delete(`${urls.comments}/${commentId}`),
};
