import jwt from 'jsonwebtoken';

import { ITokenPair, IUserPayload } from '../interfaces';
import { config } from '../configs';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );

        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken, refreshToken,
        };
    }

    public async saveTokenPair(userId: number, refreshToken: string, accessToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        const savedToken = await tokenRepository.createToken({ accessToken, refreshToken, userId });
        return savedToken;
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByUserId(userId);
    }

    verifyToken(token: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        return jwt.verify(token, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
