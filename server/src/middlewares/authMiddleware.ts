import { NextFunction, Response } from 'express';

import { IRequestExtendet } from '../interfaces';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repositories';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDb = await tokenRepository.findByAccessToken(accessToken);

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtendet, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDb = await tokenRepository.findByRefreshToken(refreshToken);

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            res.status(401).json(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
