import { DeleteResult, Repository } from 'typeorm';

import { IToken, Token } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';
import { AppDataSource } from '../../data-source';
import { ITokenRepository } from './tokenRepositoryInterface';

class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return AppDataSource.manager.getRepository(Token).save(token);
    }

    public async findByUserId(userId: number): Promise<IToken | null> {
        return AppDataSource.manager
            .getRepository(Token)
            .createQueryBuilder('token')
            .where('token.userId = :userId', { userId })
            .getOne();
    }

    public async deleteByUserId(userId: number): Promise<DeleteResult> {
        return AppDataSource.manager
            .getRepository(Token)
            .delete({ userId });
    }

    async findByAccessToken(accessToken: string): Promise<Token | null> {
        return AppDataSource.manager
            .getRepository(Token)
            .createQueryBuilder('token')
            .where('token.accessToken = :accessToken', { accessToken })
            .getOne();
    }

    async findByRefreshToken(refreshToken: string): Promise<Token | null> {
        return AppDataSource.manager
            .getRepository(Token)
            .createQueryBuilder('token')
            .where('token.refreshToken = :refreshToken', { refreshToken })
            .getOne();
    }
}

// @ts-ignore
export const tokenRepository = new TokenRepository();
