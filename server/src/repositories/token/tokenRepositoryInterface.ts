import { DeleteResult } from 'typeorm';

import { ITokenDataToSave } from '../../interfaces';
import { IToken, Token } from '../../entity';

export interface ITokenRepository{
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findByUserId(userId: number): Promise<IToken | null>;
    deleteByUserId(userId: number): Promise<DeleteResult>;
    findByAccessToken(accessToken: string): Promise<Token | null>;
    findByRefreshToken(refreshToken: string): Promise<Token | null>;
}
