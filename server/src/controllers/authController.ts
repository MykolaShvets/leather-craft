import { Request, Response } from 'express';

import { IRequestExtendet, ITokenData } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        return res.json(data);
    }

    public async login(req: IRequestExtendet, res: Response) {
        try {
            const {
                email, id, role, password: hashedPass,
            } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashedPass);

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
                role,
            });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async logout(req: IRequestExtendet, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;
        await tokenService.deleteUserTokenPair(id);
        return res.json('ok');
    }

    public async refresh(req: IRequestExtendet, res: Response) {
        try {
            const { id, email, role } = req.user as IUser;

            await tokenService.deleteUserTokenPair(id);

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email, role });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
